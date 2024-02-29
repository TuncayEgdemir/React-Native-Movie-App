import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  let movieName = "Spider-Man No Way Home";
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails();
    getMovieCredits();
    getSimilarMovies();
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(item.id);
    if (data) setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(item.id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  }
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(item.id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  }


  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-neutral-800"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-3" +
            topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1 ml-2"
          >
            <ChevronLeftIcon color="white" size="28" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toogleFavourite(!isFavourite)}
            className="mr-2"
          >
            <HeartIcon color="white" size="28" strokeWidth={2} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie.poster_path) }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie.original_title}
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movie?.status} · {movie?.release_date?.split("-")[0]} · {movie.runtime}{" "}
          min
        </Text>

        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index+1 != movie.genres.length;
            return (
              <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                {genre.name} {showDot ? "·" : null}
              </Text>
            );
          })}
          {/* <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill ·
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy ·
          </Text> */}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>
      <Cast navigation={navigation} cast={cast} />
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}
