import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MyDatePicker = ({ visible, onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    onConfirm(date);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={onCancel}
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