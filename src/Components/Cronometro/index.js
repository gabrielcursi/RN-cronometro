import React, { useState } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

let timer = null
let ss = 0
let mm = 0
let hh = 0

const Cronometro = () => {
	const [number, setNumber] = useState(0)
	const [button, setButton] = useState('VAI')
	const [last, setLast] = useState(null)

	const vai = () => {
		if (timer !== null) {
			clearInterval(timer)
			timer = null
			setButton('VAI')
		} else {
			timer = setInterval(() => {
				ss++

				if (ss == 60) {
					ss = 0
					mm++
				}
				if (mm == 60) {
					mm = 0
					hh++
				}

				let format =
					(hh < 10 ? '0' + hh : hh) + ':'
					+ (mm < 10 ? '0' + mm : mm) + ':'
					+ (ss < 10 ? '0' + ss : ss);

				setNumber(format)
			}, 1000)
			setButton('PARAR')
		}
	}

	const limpar = () => {
		if (timer !== null) {
			clearInterval(timer)
			timer = null
		}
		setLast(number)
		setNumber(0)
		ss = 0
		mm = 0
		hh = 0
		setButton('VAI')
	}

	return (
		<View style={styles.container}>
			<Image
				source={require('./src/crono.png')}
			/>
			<Text style={styles.timer}>{number}</Text>
			<View style={styles.btnArea}>
				<TouchableOpacity style={styles.btn} onPress={vai}>
					<Text style={styles.btnText}>{button}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={limpar}>
					<Text style={styles.btnText}>LIMPAR</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.areaLast}>
				<Text style={styles.textRace}>{!last ? '' : `Último tempo: ${last}`}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00aeef'
	},
	timer: {
		marginTop: -160,
		fontSize: 45,
		fontWeight: 'bold',
		color: '#FFF'
	},
	btnArea: {
		flexDirection: 'row',
		paddingTop: 130,
		height: 40
	},
	btn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
		height: 40,
		margin: 17,
		borderRadius: 9
	},
	btnText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#00aeef'
	},
	areaLast: {
		marginTop: 80
	},
	textRace: {
		fontSize: 25,
		color: '#FFF',
		fontStyle: 'italic'
	}
});

export default Cronometro;
