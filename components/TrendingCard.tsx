import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-9 -left-3.5 px-2 py-1">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">{index + 1}</Text>
            }
          >
            <Image source={images.rankingGradient} className="size-12" />
          </MaskedView>
        </View>

        <Text className="text-white mt-2 font-bold" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
