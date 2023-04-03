import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import FormComp from './FormComp';
import {UserListContext} from './createContext';

import {DeleteIcon, Heart, HeartSolid, Edit} from '../assets/exportFile';

const ButtonComp = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList, refreshThePage] = useContext(UserListContext);

  const [isLiked, setLiked] = useState(false);

  const ButtonSectionArrayList = {
    likeBtn: !isLiked ? (
      <Heart width={16} height={16} />
    ) : (
      <HeartSolid width={16} height={16} />
    ),
    edit: <Edit width={16} height={16} />,
    delete: <DeleteIcon width={16} height={16} />,
  };

  const nameArrayOfButton = ['likeBtn', 'edit', 'delete'];

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
        refreshThePage();
      })
      .catch(err => {
        console.log('the error at deletion', err);
      });
  };

  const likeBtnfunc = () => {
    setLiked(!isLiked);
    console.log('liked it');
  };

  const onPressOfBtn = e => {
    switch (e) {
      case 'likeBtn':
        likeBtnfunc();
        break;
      case 'delete':
        deleteItemFromList(props.selectedCard._id);
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
