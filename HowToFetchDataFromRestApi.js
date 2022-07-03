// How to fetch data from your Django Rest API for your react project:
// I have set up a basic component to show you where to place the code 
// to fetch the data

import { View, Text } from 'react-native'
import React from 'react'

// ==========================================================

// You also need to import useState and useEffect

import React, { useState, useEffect} from 'react';

// ==========================================================








const MainComponent = () => {

    // ==========================================================

    // This is where you need to place your code:


    //  This assigns your data to the state
    //  You just need to changed the vaiable name to suit your own variable
    const [dbfood, Setdbfood] = useState([{
        name:'name',
        protein:'protein',
        carbs:'carbs',
        kilojoules:'kilojoules',
        image:'image',

    }])

    // use effect uses the fetch function to fetch the date from 
    //  your api endpoint and then you turn that into json data
    // and finallay you assign that json data to your variable you created above
    useEffect(() => {
    
        fetch('http://192.168.1.146:8000/api/foods/', { //Just replace the link with your api endpoint
            method:"GET"
        })
    
        .then(resp => resp.json())
        .then(data => {
            Setdbfood(data) // or to trouble shoout you can console.log(date)
        })
        .catch(error => console.log("error"))
    }, [])

    // And that is how you fetch data from your rest API

    // ==========================================================



  return (
    <View>
      <Text>MainComponent</Text>
    </View>
  )
}

export default MainComponent


// =======================================================================

// All Imports:

import { View, Text, StyleSheet, Image, ScrollView,  } from 'react-native';
import React, { useState, useEffect} from 'react';

import { Divider } from 'react-native-elements'; // <--- npm command

import BouncyCheckbox from 'react-native-bouncy-checkbox'; // <--- npm command

import { useDispatch } from 'react-redux';

// =======================================================================

// Json Data: 


// The code below fetches data from Django Rest API: 
//




// =======================================================================

// Reusable style components


const styles = StyleSheet.create({
    foodItemStyle: {
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
       
    },

    titleStyle: {
        fontSize:19,
        fontWeight:'600',
    }
})

// =======================================================================

// Main Component:
 
const FoodItems = () => {

    // This fetches the data from the Django rest API:

   
    const [dbfood, Setdbfood] = useState([{
        name:'name',
        protein:'protein',
        carbs:'carbs',
        kilojoules:'kilojoules',
        image:'image',

    }])

    useEffect(() => {
    
        fetch('http://192.168.1.146:8000/api/foods/', { // Rest API link goes in there
            method:"GET"
        })
    
        .then(resp => resp.json())
        .then(data => {
            Setdbfood(data)
        })
        .catch(error => console.log("error"))
     }, [])


// =======================================================================

// This fires off the function to dispatch data to redux store

     const dispatch = useDispatch();
        const  selectItem = (item, checkboxValue) =>
        dispatch({
            type:'ADD_TO_CART',
            payload:{
                ...item,
                checkboxValue:checkboxValue,
                
            }
        })

    
// =======================================================================
    


  return (

   

    

    <ScrollView showsVerticalScrollIndicator={false}>

        {/* Loop starts here */}
        {dbfood.map((dbfood, index) => (

       
    
            <View key={index} style={{backgroundColor:'light-gray', }}>
                <View style={styles.foodItemStyle}>
                    <BouncyCheckbox
                        iconStyle={{borderColor:'lightgray', borderRadius:0, }}
                        fillColor='green'
                        onPress={(checkboxValue) => selectItem(dbfood, checkboxValue)}
                    />
                    <FoodInfo food={dbfood}/>
                    <FoodImage food={dbfood}/>
                </View>
                <Divider width={0.5} orientation='vertical' style={{marginHorizontal:20}}/>

            </View>
        ))}



    </ScrollView>
  )
}


// =======================================================================

// Food Info component

const FoodInfo = (props) => (
   
    <View style={{width:240, justifyContent:'space-evenly'}}>
        
        <Text style={styles.titleStyle}>{props.food.name}</Text>
        <Text>Protein: {props.food.protein}g</Text>
        <Text>Carbs: {props.food.carbs}g</Text>
    </View>
)

// =======================================================================

// Food Image component:
const FoodImage = (props) => (
    <View>
        <Image 
            source={{uri: props.food.image}}
            style={{width:100, height:100, borderRadius:8}}
        
        />
    </View>
)

// =======================================================================


export default FoodItems