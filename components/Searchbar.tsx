import { icons } from "@/constants/icons";
import React, { FC } from "react";
import { Image, TextInput, View } from "react-native";

type SearchbarProps = {
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
};

const Searchbar: FC<SearchbarProps> = ({
  placeholder,
  onPress,
  onChangeText,
  value,
}) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
      <Image source={icons.search} className="size-5" tintColor="#A8B5DB" />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        className="flex-1 ml-2 text-white"
        placeholderTextColor={"#A8B5DB"}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Searchbar;
