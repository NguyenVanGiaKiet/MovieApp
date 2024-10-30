import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View, Text, Dimensions, StyleSheet, Image, TouchableOpacity,
    FlatList, TextInput,
    Button
} from "react-native";
import { Movie } from './SliderDataSearch';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

const PAGE_WIDTH = Dimensions.get('screen').width;

export type Props = {
    itemListSearch: Movie[],
};

function SearchScreen({ itemListSearch }: Props) {
    const navigation = useNavigation<NavigationProp>();
    
    const [searchText, setSearchText] = useState('');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(itemListSearch);

    
    const [selectedList, setSelectedList] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedNation, setSelectedNation] = useState('');

    
    useEffect(() => {
        setFilteredMovies(itemListSearch);
    }, [itemListSearch]);

    
    const handleSearch = (text: string) => {
        setSearchText(text);

        
        const filtered = itemListSearch.filter((movie) =>
            movie.name_movie.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredMovies(filtered);
    };
    
    const filterMovies = () => {
        let filtered = itemListSearch;

        
        if (selectedList && selectedList !== 'all') {
            filtered = filtered.filter(movie => movie.list === selectedList);
        }

        
        if (selectedCategory && selectedCategory !== 'all') {
            filtered = filtered.filter(movie =>
                movie.category.includes(selectedCategory)
            );
        }

        
        if (selectedYear && selectedYear !== 'all') {
            if (selectedYear === 'before2012') {
                filtered = filtered.filter(movie => movie.year <= 2012);
            } else {
                filtered = filtered.filter(movie => movie.year === Number(selectedYear));
            }
        }

        
        if (selectedNation && selectedNation !== 'all') {
            filtered = filtered.filter(movie =>
                movie.nation.includes(selectedNation)
            );
        }

        setFilteredMovies(filtered);
    };

    
    useEffect(() => {
        filterMovies();
    }, [selectedList, selectedCategory, selectedYear, selectedNation]);



    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <View style={styles.back}>
                    <Button
                        title="Back"
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên phim"
                    placeholderTextColor="#AAAAAA"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>
            <View style={styles.dropdownContainerItem}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={selectedList}
                            style={styles.dropdown}
                            onValueChange={(itemValue) => setSelectedList(itemValue)}
                        >
                            <Picker.Item label="--Danh sách--" value="all" />
                            <Picker.Item label="Phim lẻ" value="Phim lẻ" />
                            <Picker.Item label="Phim bộ" value="Phim bộ" />
                        </Picker>
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={selectedCategory}
                            style={styles.dropdown}
                            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        >
                            <Picker.Item label="-Thể loại-" value="all" />
                            <Picker.Item label="Hoạt Hình" value="Hoạt Hình" />
                            <Picker.Item label="Gia Đình" value="Gia Đình" />
                            <Picker.Item label="Phiêu Lưu" value="Phiêu Lưu" />
                            <Picker.Item label="Hành Động" value="Hành Động" />
                            <Picker.Item label="Hài" value="Hài" />
                            <Picker.Item label="Khoa Học Viễn Tưởng" value="Khoa Học Viễn Tưởng" />
                            <Picker.Item label="Hình Sự" value="Hình Sự" />
                            <Picker.Item label="Tâm Lý" value="Tâm Lý" />
                            <Picker.Item label="Lịch Sử" value="Lịch Sử" />
                            <Picker.Item label="Kinh Dị" value="Kinh Dị" />
                        </Picker>
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={selectedYear}
                            style={styles.dropdown}
                            onValueChange={(itemValue) => setSelectedYear(itemValue)}
                        >
                            <Picker.Item label="-Năm-" value="all" />
                            <Picker.Item label="2024" value="2024" />
                            <Picker.Item label="2023" value="2023" />
                            <Picker.Item label="2022" value="2022" />
                            <Picker.Item label="2021" value="2021" />
                            <Picker.Item label="2020" value="2020" />
                            <Picker.Item label="2019" value="2019" />
                            <Picker.Item label="2018" value="2018" />
                            <Picker.Item label="2017" value="2017" />
                            <Picker.Item label="2016" value="2016" />
                            <Picker.Item label="2015" value="2015" />
                            <Picker.Item label="2014" value="2014" />
                            <Picker.Item label="2013" value="2013" />
                            <Picker.Item label="2012" value="2012" />
                            <Picker.Item label="Trước 2012" value="before2012" />
                        </Picker>
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={selectedNation}
                            style={styles.dropdown}
                            onValueChange={(itemValue) => setSelectedNation(itemValue)}
                        >
                            <Picker.Item label="-Quốc gia-" value="all" />
                            <Picker.Item label="Japan" value="Japan" />
                            <Picker.Item label="United States of America" value="United States of America" />
                            <Picker.Item label="France" value="France" />
                        </Picker>
                    </View>
                </ScrollView>

            </View>
            <FlatList
                data={filteredMovies}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{item.name_movie}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Information', { selectedMovie: item })}
                        >
                            <Image
                                source={{ uri: item.poster_path }}
                                style={styles.img}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: PAGE_WIDTH - 40,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 10,
    },
    textContainer: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    img: {
        width: 190,
        height: 300,
        borderRadius: 10,
        margin: 10,
    },
    input: {
        width: '60%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#2a2a2a',
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    back: {
        width: 100,
        marginTop: 30,
        marginRight: 15,
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdownContainerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    dropdownContainer: {
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#2a2a2a',

    },
    dropdown: {
        width: 150,
        height: 50,
        paddingHorizontal: 10,
        color: '#fff',

    },
});

