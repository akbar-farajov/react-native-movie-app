import React from "react";
import { Text, View } from "react-native";

type MovieInfoProps = {
  label: string;
  value: string | number | null;
};

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="gap-1 items-start mt-5">
      <Text className="text-light-200 text-sm font-normal">{label}</Text>
      <Text className="text-light-100 text-base font-normal">{value}</Text>
    </View>
  );
};

export default MovieInfo;
