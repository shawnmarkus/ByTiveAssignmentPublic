import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import CardComp from './CardComp';
import {UserListContext} from './createContext';
import Loader from './Loader';

const Home = () => {
  // const [list, setList] = useState();

  const [list, setList] = useContext(UserListContext);

  // useEffect(() => {
  //   fetch('https://bytivebackend-evt4.onrender.com/getUserList', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('status dekh', data);
  //       setList([...data.retrievedData]);
  //     })
  //     .catch(err => {
  //       console.log('error is ', err);
  //       if (!list) {
  //         console.log(undefined === list, list);
  //       }
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <View style={Styles.wrapperContainer}>
      {list !== undefined ? (
        list.map((item, indx) => {
          return <CardComp userItem={item} key={indx} />;
        })
      ) : (
        <Loader />
      )}
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
