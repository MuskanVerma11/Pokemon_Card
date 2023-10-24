import { StyleSheet, Text, View ,SafeAreaView, StatusBar, FlatList,Image,TouchableOpacity,Pressable,Button} from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList,setPokemonList]=useState([])
  const [limit, setLimit] = useState(20);
  const [poke, setPoke] = useState(1);
  let pokemon=[];

  const fetchData=async()=>{
    
    for(let id=poke; id<=limit; id++){
      const res=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data=await res.json();
      pokemon.push(data);
    }
    setPokemonList(pokemon)
    setIsLoading(false);
  }

  const next=()=>{
    if(limit!=100000){
      setLimit(limit+20)
      setPoke(poke+20)
      fetchData();
    }
  }

  const back=()=>{
    if(limit!=20){
      setLimit(limit-20)
      setPoke(poke-20)
      fetchData();
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
      {isLoading ? (
          <Text>Loading...</Text>
        ):(
        <FlatList
          data={pokemonList}
          keyExtractor={(item)=>{
            return item.id.toString()}}
          renderItem={({item})=>(
            <View style={styles.card}>
              <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detailText}>Type - {item.types[0].type.name}</Text>
              <Text style={styles.detailText}>Experience - {item.base_experience}</Text>
              <Text style={[styles.detailText,{fontSize:14}]}>Moves - {item.moves[0]?.move?.name}, {item.moves[1].move.name}</Text>
              </View>
              <View style={styles.image}>
              <Image style={{height:100, width:100}}
              source={{uri:item?.sprites.front_default}}></Image>
              </View>
            </View>
          )}
          ItemSeparatorComponent={()=>(
            <View style={{height:20}}></View>
          )}
          ListEmptyComponent={()=>(
            <Text>No Pokemon Found</Text>
          )}
          ListHeaderComponent={()=>(
              <Text style={styles.header}>Pokemon Cards</Text>
          )}
          ListFooterComponent={()=>(
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={back}>
                <Text style={styles.btnText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={next}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop:StatusBar.currentHeight,
  },
  listContainer:{
    flex:1,
    paddingHorizontal:16
  },
  card:{
    borderRadius:10,
    borderWidth:2,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  header:{
    textAlign:"center",
    fontSize:25,
    backgroundColor:"#AF1B3F",
    padding:15,
    marginVertical:20,
    color:"white",
    borderRadius:10,
    fontWeight:"bold",
    fontFamily:"serif",
  },
  details:{
    padding:10,
  },
  name:{
    fontSize:23,
    textTransform:"capitalize",
    fontWeight:"500"
  },
  detailText:{
    fontSize:16,
    textTransform:"capitalize"
  },
  image:{
    justifyContent:"center",
    alignItems:"center",
    padding:10,
  },
  button:{
    height:50,
    backgroundColor:"#AF1B3F",
    width:100,
    marginVertical:35,
    marginHorizontal:12,
    alignItems:"center",
    justifyContent:"center",
    elevation:7,
    shadowColor:"black",
    shadowOffset:{
      width:3,
      height:3
    }
  },
  btnText:{
    color:"white",
    fontSize:18
  },
  footer:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
});
