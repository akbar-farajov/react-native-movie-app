import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/Searchbar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>Error</Text>
        ) : (
          <View className="flex-1">
            <SearchBar
              placeholder="Search"
              onPress={() => {
                router.push("/search");
              }}
            />
            {trendingMovies && (
              <View>
                <Text className="text-white text-lg font-bold mb-3 mt-10">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </View>
            )}
            <Text className="text-white text-lg font-bold mb-3 mt-10">
              Lastest Movies
            </Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
