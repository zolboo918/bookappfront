import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import EmptyNote from "../components/EmptyNote";
import NoteItem from "../components/NoteItem";
import useNotes from "../hooks/useNotes";

const NoteList = () => {
  const [
    notes,
    loading,
    error,
    successPosted,
    writeNote,
    deleteNote,
    getNotes,
  ] = useNotes();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getNotes();
    }, 200);
  }, []);

  false;
  return (
    <View style={css.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color="##3A8096" />
        ) : notes.length > 0 ? (
          notes.map((el) => <NoteItem data={el} key={el._id} />)
        ) : (
          <EmptyNote />
        )}
      </ScrollView>
    </View>
  );
};

export default NoteList;

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
});
