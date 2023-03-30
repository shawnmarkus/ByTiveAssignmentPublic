import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import FormComp from './FormComp';
import {UserListContext} from './createContext';

import {DeleteIcon, Heart, HeartSolid, Edit} from '../assets/exportFile';

const ButtonComp = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useContext(UserListContext);

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
    const newList = list.filter(User => {
      return User._id !== _id;
    });

    if (newList) {
      setList(newList);
    }
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

  useEffect(() => {
    return;
  }, [modalVisible]);

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

function ModelComp({show, toggleModel}) {
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
          <FormComp />
          <View style={[Styles.modelButtonContainer]}>
            <Pressable
              style={[Styles.button, Styles.buttonClose]}
              onPress={() => toggleModel()}>
              <Text style={Styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable
              style={[Styles.button, Styles.buttonClose]}
              onPress={() => toggleModel()}>
              <Text style={Styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
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

  modelButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 0,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
    marginLeft: 10,
    width: 95,
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
