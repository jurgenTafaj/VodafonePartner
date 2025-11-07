import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import Table from '../components/Table'
import HeaderImage from '../components/HeaderImage'
import { useEffect, useState } from 'react';
import MyDatePicker from '../components/MyDatePicker'
import { getSales } from '../api/authService';

// Helper function to split the 'added' datetime string
const splitDateTime = (dateTimeString) => {
  if (!dateTimeString || !dateTimeString.includes(' ')) {
    return { date: 'N/A', time: 'N/A' }; // Handle potential bad data
  }
  const parts = dateTimeString.split(' ');
  return { date: parts[0], time: parts[1] }; // { date: '2025-06-03', time: '14:48:56' }
};

// Helper function to format the date for your API
// This will format as 'YYYY-MM-DD HH:MM:SS'
const formatDateTimeForAPI = (date, time = 'start') => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  if (time === 'start') {
    return `${year}-${month}-${day} 00:00:00`;
  }
  // For 'end' time
  return `${year}-${month}-${day} 23:59:59`;
};

export default function InfoScreen() {
  const getInitialDateFrom = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Set to one month ago
    return date;
  };
  // State for the dates
  const [dateFrom, setDateFrom] = useState(getInitialDateFrom());
  const [dateTo, setDateTo] = useState(new Date()); // Today

  // State for API data, loading, and errors
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // to know which button triggered the picker

  const showPicker = (buttonName) => {
    setActiveButton(buttonName);
    setPickerVisible(true);
  };

  // NEW: useEffect to fetch data on mount and when dates change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSalesData([]); // Clear old data

      try {
        // Format dates for the API call
        const formattedDateFrom = formatDateTimeForAPI(dateFrom, 'start');
        const formattedDateTo = formatDateTimeForAPI(dateTo, 'end');

        // Call your API
        const response = await getSales(formattedDateFrom, formattedDateTo);
        console.log('API Response:', response);
        // Assuming response.data is the object you showed
        if (response.data && response.data.status_code === 200) {
          setSalesData(response.data.data); // Set the array of sales
        } else {
          setError(response.data.status_message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error("API Call Error:", err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFrom, dateTo]); // This array makes the hook re-run when dateFrom or dateTo changes

  const hidePicker = () => setPickerVisible(false);

  const handleDateConfirm = (date) => {
    // Update the correct date state based on which button was pressed
    if (activeButton === 'Nga') {
      setDateFrom(date);
    } else if (activeButton === 'Deri') {
      setDateTo(date);
    }
    hidePicker();
  };

  // NEW: Helper function to render the main content (loading, error, or data)
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
    }

    if (error) {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (salesData.length === 0) {
      return <Text style={styles.noDataText}>No sales data found for this period.</Text>;
    }

    // Map over the data and render a Table for each item
    return salesData.map((sale) => {
      // Split the 'added' string into date and time
      const { date, time } = splitDateTime(sale.added);

      return (
        <Table
          key={sale.id} // React needs a unique key for list items
          coupon={sale.coupon}
          invoice_amount={sale.invoice_amount}
          discount={sale.discount}
          product={sale.product}
          // NEW: Pass the split date and time as separate props
          addedDate={date}
          addedTime={time}
        />
      );
    });
  };

  return (
    <>
      <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />
      <View style={{ flex: 1, marginTop: -180, marginBottom: -270 }}>

        <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
          <Image source={require('../assets/icons/sm_agenda_search.png')} style={styles.logo} />
          <Text style={{ fontWeight: 'bold', paddingTop: 10, fontSize: 15 }}>Kërko me datë</Text>
        </View>

        <View style={styles.datePickerContainer}>
          <TouchableOpacity style={styles.buton} onPress={() => showPicker('Nga')}>
            <Text style={styles.butonText}>Nga</Text>
            <Text style={styles.butonDateText}>{dateFrom.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buton} onPress={() => showPicker('Deri')}>
            <Text style={styles.butonText}>Deri</Text>
            <Text style={styles.butonDateText}>{dateTo.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        {/* This part remains the same */}
        <MyDatePicker
          visible={isPickerVisible}
          onConfirm={handleDateConfirm}
          onCancel={hidePicker}
          // NEW: Set the initial date on the picker
          date={activeButton === 'Nga' ? dateFrom : dateTo}
        />

      </View>

      <ScrollView style={styles.scrollView}>
        {/* NEW: Render the content */}
        <View style={styles.tableContainer}>
          {renderContent()}
        </View>

      </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 40
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Changed for better spacing
    alignItems: 'center',
  },
  buton: {
    paddingHorizontal: 20, // Reduced padding to fit
    paddingVertical: 10,
    backgroundColor: '#ffffffff',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center', // Center text
    minWidth: 150, // Give buttons a minimum width
  },
  butonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  butonDateText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  scrollView: {
    flex: 1, // Make scrollview fill the container
  },
  tableContainer: {
    paddingHorizontal: 10, // Add some padding for the tables
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  }
})