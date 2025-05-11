import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Container20 = () => {
  const [emergency, setEmergency] = useState(false);
  const [elective, setElective] = useState(false);
  const [others, setOthers] = useState(false);
  const [inpatient, setInpatient] = useState(false);
  const [outpatient, setOutpatient] = useState(false);

  const toggleCheckbox = (setter, current) => {
    setter(!current);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Header Container */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconTextContainer}>
              <Icon name="home-outline" size={18} color="#000" />
              <Text style={styles.menuText}>Home</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>Health care insurance</Text>
              <Text style={styles.headerSubtitle}>Inpatient Medical claim</Text>
            </View>
            <Image
              source={require('../assets/img.png')}
              style={styles.image}
            />
          </View>
        </View>
          

        {/* Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>To be filled by Doctor</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Doctor name :</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Patient name :</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>ClmProcedureCode_1 :</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>ClmProcedureCode_2 :</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>ClmProcedureCode_3 :</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>ClmProcedureCode_4 :</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>ClmProcedureCode_5 :</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>ClmProcedureCode_6 :</Text>
            <TextInput style={styles.input} />
          </View>





          <View style={styles.formRow}>
            <Text style={styles.label}>Source of Admission :</Text>
            <View style={styles.checkboxRow}>
              <TouchableOpacity onPress={() => toggleCheckbox(setEmergency, emergency)}>
                <View style={[styles.checkbox, emergency && styles.checkedCheckbox]}>
                  {emergency && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Emergency</Text>

              <TouchableOpacity onPress={() => toggleCheckbox(setElective, elective)}>
                <View style={[styles.checkbox, elective && styles.checkedCheckbox]}>
                  {elective && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Elective/Plan</Text>

              <TouchableOpacity onPress={() => toggleCheckbox(setOthers, others)}>
                <View style={[styles.checkbox, others && styles.checkedCheckbox]}>
                  {others && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Others</Text>
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Patient Registered As :</Text>
            <View style={styles.checkboxRow}>
              <TouchableOpacity onPress={() => toggleCheckbox(setInpatient, inpatient)}>
                <View style={[styles.checkbox, inpatient && styles.checkedCheckbox]}>
                  {inpatient && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Inpatient</Text>

              <TouchableOpacity onPress={() => toggleCheckbox(setOutpatient, outpatient)}>
                <View style={[styles.checkbox, outpatient && styles.checkedCheckbox]}>
                  {outpatient && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Outpatient</Text>
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Give The brief Detail of Patient :</Text>
            <TextInput style={styles.input} multiline={true} numberOfLines={3} />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity><Icon name="logo-facebook" size={18} color="#000" /></TouchableOpacity>
          <TouchableOpacity><Icon name="logo-instagram" size={18} color="#000" /></TouchableOpacity>
          <TouchableOpacity><Icon name="logo-twitter" size={18} color="#000" /></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderWidth: 2,
        borderRadius: 8,
        padding: 4,
      },
      scrollContainer: {
        flexGrow: 1,
      },
      headerContainer: {
        padding: 8, 
        backgroundColor: '#fff', 
        borderBottomWidth: 0, 
        borderColor: '#ddd', 
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16, 
        paddingHorizontal: 12, 
        marginBottom: 16, 
        backgroundColor: '#F9E7E7',
        height: 60,
      },
      iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuText: {
        marginLeft: 4,
        fontSize: 12,
        color: '#000',
      },
      headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      headerSubtitle: {
        fontSize: 12,
        color: '#555',
      },
      image: {
        width: 70,
        height: 50,
        borderRadius:10,
      },
  noticeContainer: {
    backgroundColor: '#f0c0c0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    alignItems:'center',
  },
  noticeText: {
    fontSize: 14,
  },
  form: {
    marginBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 12,
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: '#EAEDED',
    borderRadius: 4,
    fontSize: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 3,
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    fontSize: 12,
    marginRight: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default Container20;
