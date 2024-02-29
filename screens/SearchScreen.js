import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { image185, searchMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
let movieName = "Spider-Man No Way Home";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: false,
        language: "en-US",
        page: 1,
      }).then((data) => {
        if (data && data.results) setResult(data.results);
        setLoading(false);
      });
    }else{
      setLoading(false);
      setResult([]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={(value) => handleSearch(value)}
          placeholder="Search Movies"
          placeholderTextColor={"lightgray"}
          className="p-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider "
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon color="white" size="25" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Result : ({result.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {result.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <View className="space-y-2 mb-4 ">
                    <Image
                      source={{ uri: image185(item.poster_path) }}
                      className="rounded-3xl"
                      style={{ height: height * 0.3, width: width * 0.44 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title?.length > 22
                        ? item?.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-xl">No Result Found :(</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
