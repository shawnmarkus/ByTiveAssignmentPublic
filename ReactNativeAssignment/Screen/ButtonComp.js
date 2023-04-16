import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native';
import FormComp from './FormComp';
import {UserListContext} from './createContext';

import {DeleteIcon, Heart, HeartSolid, Edit} from '../assets/exportFile';

const ButtonComp = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList, onRefresh] = useContext(UserListContext);

  // const [isLiked, setLiked] = useState(false);
  const [isLiked, setLiked] = useState(props.selectedCard.isLiked);

  const ButtonSectionArrayList = {
    likeBtn: isLiked ? (
      <HeartSolid width={16} height={16} />
    ) : (
      <Heart width={16} height={16} />
    ),
    edit: <Edit width={16} height={16} />,
    delete: <DeleteIcon width={16} height={16} />,
  };

  // useEffect(() => {}, [isLiked]);

  const nameArrayOfButton = ['likeBtn', 'edit', 'delete'];

  const showAlert = () =>
    Alert.alert(
      'Waring Deletion',
      'Want to proceed to delete',
      [
        {
          text: 'Cancel',
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: 'Proceed',
          onPress: () => {
            deleteItemFromList(props.selectedCard._id);
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

  const deleteItemFromList = _id => {
    console.log('deleted corresponding item', _id);

    fetch('https://bytivebackend-evt4.onrender.com/deleteUser', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let newList = list.filter(item => _id !== item._id);
        setList(newList);
        //refreshThePage();
      })
      .catch(err => {
        console.log('the error at deletion', err);
      });
  };

  const likeBtnfunc = _id => {
    setLiked(!isLiked);
    fetch('https://bytivebackend-evt4.onrender.com/likeit', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
        likeState: !isLiked,
      }),
    });
    console.log('liked it');
  };

  const onPressOfBtn = e => {
    switch (e) {
      case 'likeBtn':
        likeBtnfunc(props.selectedCard._id);
        break;
      case 'delete':
        // deleteItemFromList(props.selectedCard._id);
        showAlert();
        break;
      case 'edit':
        setModalVisible(!modalVisible);
        break;
    }
  };

  return (
    <View style={Styles.flexContainer}>
      {nameArrayOfButton.map((item, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            style={Styles.iconConatiner}
            onPress={() => onPressOfBtn(item)}>
            <View name={item}>{ButtonSectionArrayList[item]}</View>

            {modalVisible && item === 'edit' ? (
              <ModelComp
                show={modalVisible}
                toggleModel={() => setModalVisible(!modalVisible)}
                _id={props.selectedCard._id}
              />
            ) : null}
            {nameArrayOfButton[idx + 1] ? (
              // eslint-disable-next-line react/self-closing-comp
              <View style={Styles.verticleLine}></View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function ModelComp({show, toggleModel, _id}) {
  // listOfUser.indexOf()

  console.log('model');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        toggleModel();
      }}>
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <FormComp _id={_id} toggleModel={() => toggleModel()} />
        </View>
      </View>
    </Modal>
  );
}

const Styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },

  iconConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: 'black',
    position: 'absolute',
    right: 0,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#8f8f8f',
    shadowOpacity: 0.25,
    elevation: 15,
    width: '90%',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ButtonComp;
