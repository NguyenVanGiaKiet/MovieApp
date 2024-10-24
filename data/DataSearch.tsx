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
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

const PAGE_WIDTH = Dimensions.get('screen').width;

export type Props = {
    itemListSearch: Movie[],
};

function Parallax({ itemListSearch }: Props) {
    const navigation = useNavigation<NavigationProp>();
    // State cho giá trị tìm kiếm và danh sách phim đã lọc
    const [searchText, setSearchText] = useState('');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(itemListSearch);

    const [open, setOpen] = useState(false);  // Điều khiển trạng thái mở/đóng
    const [value, setValue] = useState<string | null>(null); // Giá trị được chọn
    const [items, setItems] = useState([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ]);

    // Khi màn hình được mở, khởi tạo danh sách phim đã lọc bằng tất cả các phim
    useEffect(() => {
        setFilteredMovies(itemListSearch);
    }, [itemListSearch]);

    // Hàm lọc phim khi người dùng nhập
    const handleSearch = (text: string) => {
        setSearchText(text);

        // Lọc phim dựa trên tên (không phân biệt chữ hoa/thường)
        const filtered = itemListSearch.filter((movie) =>
            movie.name_movie.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredMovies(filtered);
    };
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
            
                    <View style={styles.dropdownScrollView}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />
                    </View>





            <FlatList
                data={filteredMovies}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{item.name_movie}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.imgContainer}
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

export default Parallax;

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
        width: PAGE_WIDTH - 40, // Đảm bảo item không bị tràn ra ngoài màn hình
        marginVertical: 10, // Khoảng cách giữa các item
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 10,
    },
    textContainer: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
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
    imgContainer: {},
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
        paddingBottom: 20, // Đảm bảo item cuối không bị cắt
    },
    back: {
        width: 100,
        marginTop: 30,
        marginRight: 15,
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dropdown: {
        width: 200,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    dropdownContainer: {
        backgroundColor: 'white',
        width: 200,
    },
    dropdownScrollView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: PAGE_WIDTH,
        marginTop: 10,
        marginBottom: 20,
        height: 300,
    },
    dropdownitem: {
        height: 200
    }
});
