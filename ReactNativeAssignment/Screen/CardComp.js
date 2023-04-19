import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SvgCssUri, SvgUri} from 'react-native-svg';
import ButtonComp from './ButtonComp';
import {Email, Call, Enternet} from '../assets/exportFile';

const CardComp = ({userItem}) => {
  const SvgComponentMap = {
    email: <Email width={16} height={16} />,
    contactNo: <Call width={16} height={16} />,
    website: <Enternet width={16} height={16} />,
    name: userItem !== undefined ? <Name name={userItem.name} /> : null,
  };

  const mapTheStructure = {
    1: 'name',
    2: 'email',
    3: 'contactNo',
    4: 'website',
  };

  const onError = e => {
    console.log(e.message);
    // setLoading(false);
  };
  const onLoad = () => {
    console.log('Svg loaded!');
    // setLoading(false);r
  };

  return (
    <View style={Style.wraperContainer}>
      {userItem !== undefined ? (
        <>
          <View style={[Style.image]}>
            <SvgUri
              uri={userItem.imgSrc}
              width={'100%'}
              height={'100%'}
              onError={onError}
            />
          </View>

          <View style={Style.detail_container}>
            {Object.values(mapTheStructure).map((item, idx) => {
              return (
                <View key={idx} style={Style.meta_data_container}>
                  {SvgComponentMap[item]}
                  <Text style={[Style.metaData, {height: 100}]}>
                    {item !== 'name' ? userItem[item] : null}
                  </Text>
                </View>
              );
            })}
          </View>
        </>
      ) : null}

      <View style={Style.button_section}>
        <ButtonComp selectedCard={userItem} />
      </View>
    </View>
  );
};

function Name({name}) {
  return <Text style={Style.name}>{name}</Text>;
}

const Style = StyleSheet.create({
  wraperContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    elevation: 8,
  },

  meta_data_container: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    padding: 10,
    paddingLeft: 20,
  },
  metaData: {
    paddingLeft: 15,
    color: 'black',
  },

  image: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 0.5,
    borderColor: 'black',
    borderStyle: 'solid',
  },

  detail_container: {
    height: 150,
    backgroundColor: 'white',
  },

  name: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
    height: 100,
  },

  button_section: {
    height: 40,
    backgroundColor: '#f0f0f0',
  },
});

export default CardComp;
