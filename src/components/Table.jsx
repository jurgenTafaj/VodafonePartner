import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderImage from '../components/HeaderImage'

const Table = ({ coupon, invoice_amount, discount, added, product, addedDate, addedTime }) => {
  return (
    <>

      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity>
          <Image source={require('../assets/icons/sm_agenda.png')} style={[styles.icon]} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingHorizontal: 10, marginVertical: 5 }}>{addedTime}</Text>
          <Text style={{ color: '#f40000ff', marginVertical: 5 }}>|</Text>
          <Text style={{ paddingHorizontal: 10, marginVertical: 5 }}>{addedDate}</Text>
        </View>

      </View>

      <View style={{ marginBottom: 20, marginHorizontal: 10 }}>
        <View style={[styles.line1, styles.lines]}>
          <Text style={styles.line}>Kuponi</Text>
          <Text style={styles.line}>Fatura</Text>
          <Text style={styles.line}>Zbritja</Text>
        </View>
        <View style={[styles.line2, styles.lines]}>
          <Text style={styles.line}>{coupon}</Text>
          <Text style={styles.line}>{invoice_amount}</Text>
          <Text style={styles.line}>{discount}</Text>
        </View>
        <View style={[styles.line3]}>
          <Image source={require('../assets/icons/sm_produkti.png')} style={styles.icon} />
          <Text style={{ marginTop: 5, color: '#f00505ff', fontSize: 12 }}>{product}</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  component: {
  },
  lines: {
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#bababaff',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  line3: {
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    paddingLeft: 0,
    //flexWrap: 'wrap'
  },
  component: {
  },
  icon: {
    height: 30,
    width: 30,
    //marginLeft: 15
  },
  line: {
    marginHorizontal: 40,
  }
})

export default Table;