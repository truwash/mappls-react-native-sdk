import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../utils/navigationUtils';
import ArrowBackIcon from '../../assets/ArrowBackIcon';
import colors from '../../constants/colors';
import styles from '../../constants/styles';
import MapplsGeoFence from 'mappls-geofence-widget-react-native'



export default function GeoFenceWidget() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const [geoFenceWidgetResponse, setGeoFenceWidgetResponse] = useState();
    const [resultText, setResultText] = useState('Result will show here');

    const openGeoFence = async () => {
        try {
            const res = await MapplsGeoFence.openGeoFenceWidget({
                toolbarColor: colors.backgroundPrimary,
            })
            setGeoFenceWidgetResponse(res)
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View
            style={{
                backgroundColor: colors.backgroundPrimary,
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowBackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>GeoFence Widget</Text>
                </View>
            </View>

            {/* Button and Result */}
            <View style={styles.root}>
                <TouchableOpacity style={styles.button} onPress={openGeoFence}>
                    <Text style={styles.buttonText}>Open GeoFence Widget</Text>
                </TouchableOpacity>
                {geoFenceWidgetResponse && (
                    <ScrollView contentContainerStyle={{ padding: 10 }}>
                        <Text style={styles.responseText}>
                            {JSON.stringify(geoFenceWidgetResponse, null, 2)}
                        </Text>
                    </ScrollView>
                )}

            </View>


        </View>
    );
}
