import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import Table from '../components/Table'
import HeaderImage from '../components/HeaderImage'
import { useEffect, useState } from 'react';
import MyDatePicker from '../components/MyDatePicker'
import { getSales } from '../api/authService';

const splitDateTime = (dateTimeString) => {
  if (!dateTimeString || !dateTimeString.includes(' ')) {
    return { date: 'N/A', time: 'N/A' };
  }
  const parts = dateTimeString.split(' ');
  return { date: parts[0], time: parts[1] };
};

const formatDateTimeForAPI = (date, time = 'start') => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (time === 'start') {
    return `${year}-${month}-${day} 00:00:00`;
  }
  return `${year}-${month}-${day} 23:59:59`;
};

export default function InfoScreen() {
  const getInitialDateFrom = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  };

  const [dateFrom, setDateFrom] = useState(getInitialDateFrom());
  const [dateTo, setDateTo] = useState(new Date());

  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const showPicker = (buttonName) => {
    setActiveButton(buttonName);
    setPickerVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSalesData([]);

      try {
        const formattedDateFrom = formatDateTimeForAPI(dateFrom, 'start');
        const formattedDateTo = formatDateTimeForAPI(dateTo, 'end');

        const response = await getSales(formattedDateFrom, formattedDateTo);
        console.log('API Response:', response);
        if (response.data && response.data.status_code === 200) {
          setSalesData(response.data.data);
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
  }, [dateFrom, dateTo]);
  const hidePicker = () => setPickerVisible(false);

  const handleDateConfirm = (date) => {
    if (activeButton === 'Nga') {
      setDateFrom(date);
    } else if (activeButton === 'Deri') {
      setDateTo(date);
    }
    hidePicker();
  };

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

    return salesData.map((sale) => {
      const { date, time } = splitDateTime(sale.added);

      return (
        <Table
          key={sale.id}
          coupon={sale.coupon}
          invoice_amount={sale.invoice_amount}
          discount={sale.discount}
          product={sale.product}
          addedDate={date}
          addedTime={time}
        />
      );
    });
  };

  return (
    <>
      <HeaderImage text1="PERDORUESI" text2="adrionadmin" imageURL="notHome" />
      <View style={{ flex: 1, }}>

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

        <MyDatePicker
          visible={isPickerVisible}
          onConfirm={handleDateConfirm}
          onCancel={hidePicker}
          date={activeButton === 'Nga' ? dateFrom : dateTo}
        />

        <ScrollView style={styles.scrollView}>
          <View style={styles.tableContainer}>
            {renderContent()}
          </View>

        </ScrollView>
      </View>

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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffffff',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 150,
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
    //flex: 1,
    //paddingTop: 50
  },
  tableContainer: {
    paddingHorizontal: 10,
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