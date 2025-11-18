import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native";
import axios from "axios";
import { Calendar } from "react-native-calendars";

const API_URL = process.env.API || "";
export default function Index() {
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/bookings`);
      setBookedDates(response.data.bookings.map((b: any) => b.date));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch bookings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const bookDate = async () => {
    if (!selectedDate || !name.trim()) {
      Alert.alert("Error", "Select a date and enter your name");
      return;
    }

    if (bookedDates.includes(selectedDate)) {
      Alert.alert("Error", "This date is already booked");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/bookings`, { date: selectedDate, name });
      Alert.alert("Success", `Date ${selectedDate} booked!`);
      setSelectedDate(null);
      setName("");
      fetchBookings();
    } catch (error: any) {
      if (error.response?.status === 409) {
        Alert.alert("Error", "Date already booked");
      } else {
        Alert.alert("Error", "Failed to book date");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const markedDates = bookedDates.reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: "#ff6b6b" };
    return acc;
  }, {} as Record<string, any>);

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: "#4caf50",
    };
  }

  return (
    <View style={styles.container}>
      <StatusBar
      barStyle="dark-content"
      backgroundColor="#f7f7f7"
      />

      <Text style={styles.title}>Employee Car Parking System</Text>

      <TextInput
      style={styles.input}
      placeholder="Your Name"
      placeholderTextColor="#000"
      value={name}
      onChangeText={setName}
      />

      {loading && <ActivityIndicator size="large" color="#4caf50" style={{ marginVertical: 20 }} />}

      <Calendar
      onDayPress={(day) => setSelectedDate(day.dateString)}
      markedDates={markedDates}
      style={styles.calendar}
      theme={{
        backgroundColor: "#fff",
        calendarBackground: "#fff",
        textSectionTitleColor: "#555",
        selectedDayBackgroundColor: "#4caf50",
        selectedDayTextColor: "#fff",
        todayTextColor: "#2196f3",
        dayTextColor: "#333",
        textDisabledColor: "#ccc",
        dotColor: "#ff6b6b",
        selectedDotColor: "#fff",
        arrowColor: "#2196f3",
      }}
      />

      <TouchableOpacity style={styles.button} onPress={bookDate}>
      <Text style={styles.buttonText}>Book Date</Text>
      </TouchableOpacity>

      {selectedDate && <Text style={styles.selectedText}>Selected: {selectedDate}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
});
