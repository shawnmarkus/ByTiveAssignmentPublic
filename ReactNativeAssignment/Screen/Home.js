import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CardComp from './CardComp';
import {UserListContext} from './createContext';
import Loader from './Loader';

const Home = () => {
  const [list, setList] = useState();

  useEffect(() => {
    // if (list === undefined) {
    //   setList([
    //     {
    //       name: 'Leanne Graham',
    //       imgSrc:
    //         'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
    //       email: 'Sincere@april.biz',
    //       contactNo: '1-770-736-8031 x56442',
    //       website: 'http://hildegard.org',
    //     },
    //     {
    //       name: 'assad Graham',
    //       imgSrc:
    //         'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
    //       email: 'Sincere@april.biz',
    //       contactNo: '1-770-736-8031 x56442',
    //       website: 'http://hildegard.org',
    //     },
    //     {
    //       name: 'khasa Graham',
    //       imgSrc:
    //         'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
    //       email: 'Sincere@april.biz',
    //       contactNo: '1-770-736-8031 x56442',
    //       website: 'http://hildegard.org',
    //     },
    //   ]);
    // }

    fetch('http://192.168.43.152:5001/getUserList', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('status dekh', data.retrievedData);
        setList([...data.retrievedData]);
      })
      .catch(err => {
        console.log('error is ', err);
        if (!list) {
          console.log(undefined === list, list);
          setList([
            {
              name: 'Leanne Graham',
              imgSrc:
                'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
              email: 'Sincere@april.biz',
              contactNo: '1-770-736-8031 x56442',
              website: 'http://hildegard.org',
            },
            {
              name: 'assad Graham',
              imgSrc:
                'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
              email: 'Sincere@april.biz',
              contactNo: '1-770-736-8031 x56442',
              website: 'http://hildegard.org',
            },
            {
              name: 'khasa Graham',
              imgSrc:
                'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
              email: 'Sincere@april.biz',
              contactNo: '1-770-736-8031 x56442',
              website: 'http://hildegard.org',
            },
          ]);
        }
      });
    // console.log('kiya ki nhi', list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={Styles.wrapperContainer}>
      <UserListContext.Provider value={[list, setList]}>
        {list !== undefined ? (
          list.map((item, indx) => {
            return <CardComp userItem={item} key={indx} />;
          })
        ) : (
          <Loader />
        )}

        {/* <Text style={{color: 'black'}}>{JSON.stringify(list)}</Text> */}
      </UserListContext.Provider>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrapperContainer: {
    width: '100%',
    height: '100%',
  },
});

export default Home;
