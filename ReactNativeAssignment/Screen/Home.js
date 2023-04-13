import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import CardComp from './CardComp';
import {UserListContext} from './createContext';
import Loader from './Loader';

const Home = ({refreshThePage}) => {
  const [list, setList] = useState();

  useEffect(() => {
    fetch('https://bytivebackend-evt4.onrender.com/getUserList', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('status dekh', data);
        setList([...data.retrievedData]);
      })
      .catch(err => {
        console.log('error is ', err);
        if (!list) {
          console.log(undefined === list, list);

          // dummy data to test ui
          // setList([
          //   {
          //     name: 'Leanne Graham',
          //     imgSrc:
          //       'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
          //     email: 'Sincere@april.biz',
          //     contactNo: '1-770-736-8031 x56442',
          //     website: 'http://hildegard.org',
          //     _id: 1,
          //   },
          //   {
          //     name: 'assad Graham',
          //     imgSrc:
          //       'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
          //     email: 'Sincere@april.biz',
          //     contactNo: '1-770-736-8031 x56442',
          //     website: 'http://hildegard.org',
          //     _id: 2,
          //   },
          //   {
          //     name: 'khasa Graham',
          //     imgSrc:
          //       'https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy',
          //     email: 'Sincere@april.biz',
          //     contactNo: '1-770-736-8031 x56442',
          //     website: 'http://hildegard.org',
          //     _id: 3,
          //   },
          // ]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={Styles.wrapperContainer}>
      <UserListContext.Provider value={[list, setList, refreshThePage]}>
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
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
