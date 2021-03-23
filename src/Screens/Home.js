import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  FoodCard,
  FoodIcon,
  HorizontalList,
  ItemCard,
  SearchBar,
  Wrapper,
} from '../Components';
import { colors, fonts, metrics } from '../utils/Theme';
import data from '../../data';
import Category from '../Components/Category';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '1',
      categories: [],
      items: [],
      recommended: [],
    };
  }

  componentDidMount() {
    const items = this.props.products.filter(
      (val) => val.categoryid == this.state.selectedCategory,
    );
    const recommended = this.props.products.filter((val) => val.recommended);
    this.setState({
      items: items,
      recommended: recommended,
    });
  }

  selectCategory = (item) => {
    this.setState({ selectedCategory: item.id });
    const items = this.props.products.filter(
      (val) => val.categoryid == item.id,
    );
    this.setState({ items: items });
  };

  UNSAFE_componentWillReceiveProps(props) {
    const items = props.products.filter(
      (val) => val.categoryid == this.state.selectedCategory,
    );
    const recommended = props.products.filter((val) => val.recommended);
    this.setState({
      items: items,
      recommended: recommended,
    });
  }
  render() {
    console.log('margins', )
    return (
      <Wrapper showTopDrop={true} >
        
        <ScrollView
          style={{ flex: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
         {/* <Wrapper>

         </Wrapper> */}
         <View>
         <View style={styles.backview}></View> 
         <View style={{marginTop:-210}}>

            <View style={styles.headingContainer}>
              <Text style={styles.heading}>
                <Text style={{ fontFamily: fonts.primaryBold, fontWeight:'bold' }}>KANIAN</Text>{'\n'}
               <Text style={{fontSize:14}}>Burger And Food App</Text> 
              </Text>
              <Icon
                onPress={() => Navigator.navigate('Order')}
                name="cart"
                style={styles.icon}
              />
            </View>
            <SearchBar disabled 
            // iconView={{ right: 6}} containerStyle={{backgroundColor: 'transparent'}}
            />

            <View style={{ marginTop: 10 }}>
              <HorizontalList
                data={data.category}
                renderItem={({ item }) => (
                  <Category
                    item={item}
                    selected={item.id == this.state.selectedCategory}
                    onPress={() => this.selectCategory(item)}
                  />
                )}
              />
            </View>

            <HorizontalList
              // horizontal={false}
              // numColumns={2}
              data={this.state.items}
              renderItem={({ item }) => (
                <FoodCard item={item} />
              )}
            />


            <Text style={styles.subHeading}>Recommended</Text>
            <HorizontalList
              data={this.state.recommended}
              renderItem={({ item }) => <ItemCard item={item} />}
            />
            {this.props.favProducts.length > 0 && (
              <>
                <Text style={styles.subHeading}>Favourites</Text>
                <HorizontalList
                  data={this.props.favProducts}
                  renderItem={({ item }) => <ItemCard item={item} />}
                />
              </>
            )}
          </View>
         </View>
        </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    // margin: metrics.defaultMargin,
    // marginBottom:0,
    // marginVertical:0,
    // flex:1,
    // borderColor:'red',
    // borderWidth:1
  },
  heading: {
    fontFamily: fonts.primary,
    fontSize: 26,
    margin: metrics.defaultMargin,
    marginRight: metrics.width * 0.35,
    color:'white',
  },
  subHeading: {
    fontFamily: fonts.primaryBold,
    fontSize: 24,
    margin: metrics.defaultMargin,
    fontWeight:'bold',
    color:colors.secondary
  },
  category: {
    transform: [{ rotate: '270deg' }],
    marginVertical: 15,
    marginLeft: metrics.smallMargin,
    textAlign: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: fonts.primary,
    fontSize: 16,
    marginBottom: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'relative',
    right: metrics.defaultMargin,
    // top: metrics.defaultMargin,
    fontSize: 32,
    color: 'white',
  },
  backview:{
    backgroundColor:colors.primary,
    width: metrics.width,
    height:210,
    position:'relative',
    top:0,
    left:0,
    borderBottomRightRadius:35,
    borderBottomLeftRadius:35,
  }
});

const mapStateToProps = (state) => {
  return {
    products: state.products,
    favProducts: state.favProducts,
  };
};

export default connect(mapStateToProps)(Home);
