import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setProducts} from '../../actions/products';

const labels = {
  heading: 'List of products',
  searchPlaceholder: 'Start typing to search...',
  loading: 'Loading...',
};

const ProductItem = ({item}) => {
  return (
    <View style={styles.product}>
      <Text>Name: {item.title}</Text>
      <Text>Price: {item.price}</Text>
    </View>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(products => {
        dispatch(setProducts(products));
      });
  }, [dispatch]);
  const productsData = useSelector(
    state => state.products.data && state.products.data.products,
  );
  const [filteredData, setFilteredData] = useState(productsData);
  useEffect(() => {
    setFilteredData(productsData);
  }, [productsData]);

  const handleSearchChange = value => {
    const updatedData = productsData.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(updatedData);
  };
  return (
    <View style={styles.container}>
      {filteredData ? (
        <>
          <Text style={styles.heading}>{labels.heading}</Text>
          <TextInput
            placeholder={labels.searchPlaceholder}
            onChangeText={handleSearchChange}
            style={styles.input}
          />
          <FlatList data={filteredData} renderItem={ProductItem} />
        </>
      ) : (
        <Text>{labels.loading}</Text>
      )}
    </View>
  );
};

export default Products;
