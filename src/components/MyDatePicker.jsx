import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MyDatePicker = ({ visible, onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const handleTimeConfirm = (time) => {

    const finalDateTime = new Date(selectedDate);
    finalDateTime.setHours(time.getHours());
    finalDateTime.setMinutes(time.getMinutes());

    setShowTimePicker(false);
    onConfirm(finalDateTime);
  };

  const handleCancel = () => {
    setShowTimePicker(false);
    onCancel();
  };

  return (
    <View>

      <DateTimePickerModal
        isVisible={visible && !showTimePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleCancel}
      />

      <DateTimePickerModal
        isVisible={showTimePicker} // shows only when set true
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={handleCancel}
      />


      {selectedDate && (
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Selected Date: {selectedDate.toDateString()}
        </Text>
      )}
    </View>

  )
}

export default MyDatePicker;