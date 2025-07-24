import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (movies?.length! > 0 && movies?.[0]) {
      updateSearchCount(query, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <Searchbar
                placeholder="Search for a movie"
                value={query}
                onChangeText={(text: string) => {
                  setQuery(text);
                }}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && query.trim() && movies?.length! > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for <Text className="text-accent">{query}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="flex-1 justify-center items-center mt-10">
              <Text className="text-white text-center">
                {query.trim()
                  ? `No movies found for "${query}"`
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
