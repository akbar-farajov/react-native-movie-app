import MovieInfo from "@/components/MovieInfo";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  const {
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    vote_count,
    overview,
    genres,
    budget,
    revenue,
    production_companies,
  } = movie ?? {};

  const formatNumber = (num: number) => {
    if (num > 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num > 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
            }}
            className="w-full h-[550px] rounded-lg"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start jcenter mt-5 px-5">
          <Text className="text-white text-xl font-bold">{title}</Text>
          <View className="flex-row items-center gap-1 mt-2">
            <Text className="text-light-200 text-sm font-bold">
              {release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm font-bold">{runtime}m</Text>
          </View>
          <View className="flex-row px-2.5 py-2 bg-dark-100 rounded-2xl mt-2 gap-1">
            <Image source={icons.star} />
            <Text className="text-white text-sm font-bold">
              {Math.round(vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm font-semibold">
              ({vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={overview ?? "-"} />
          <MovieInfo
            label="Genres"
            value={genres?.map((g) => g.name).join(" - ") || "-"}
          />
          <View className="w-1/2 flex-row justify-between">
            <MovieInfo
              label="Budget"
              value={
                formatNumber(budget ?? 0) === "0"
                  ? "-"
                  : formatNumber(budget ?? 0)
              }
            />
            <MovieInfo label="Revenue" value={formatNumber(revenue ?? 0)} />
          </View>
          <MovieInfo
            label="Production companies"
            value={production_companies?.map((c) => c.name).join(" - ") ?? "-"}
          />
        </View>

        <TouchableOpacity
          className="mt-5 mx-5 flex-row items-center justify-center px-5 py-3.5 bg-accent z-50 rounded-lg"
          onPress={goBack}
        >
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor="#ffffff"
          />
          <Text className="text-white text-base font-bold">Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
