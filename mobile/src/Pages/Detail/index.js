import React from 'react'
import { Feather } from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, Linking} from 'react-native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assests/logo.png'

import styles from './styles'

export default function Detail(){

    const navigation = useNavigation()
    const route = useRoute()

    const Incident = route.params.Incident
    const message = `Olá ${Incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${Incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Incident.value)}.`

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${Incident.title}`,
            recipients: [Incident.email],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${Incident.whatsapp}&text=${message}`)
    }

    return(
        <View style={styles.container}> 

            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity 
                onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e82041'/>
                </TouchableOpacity>
            </View>

            <View style={styles.Incident}>
                <Text style={[styles.IncidentPropetry, { marginTop : 0}]}> ONG:</Text>
                <Text style={styles.IncidentValue}> {Incident.name} de {Incident.city}/{Incident.uf} </Text>

                <Text style={styles.IncidentPropetry}> Caso:</Text>
                <Text style={styles.IncidentValue}> {Incident.description}</Text>

                <Text style={styles.IncidentPropetry}> VALOR:</Text>
                <Text style={styles.IncidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Incident.value)} </Text>
            </View>

            <View style={styles.contatcBox}>
                <Text style={styles.heroTtile}> Salve o dia!</Text>
                <Text style={styles.heroTtile}> Seja o herói desse caso.</Text>

                <Text style={styles.HeroDescription}> Entre em conatato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity 
                    style={styles.action}
                    onPress={sendWhatsapp}>
                        <Text style={styles.actionText}> WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.action}
                    onPress={sendMail}>
                        <Text style={styles.actionText}> E-mail</Text>
                    </TouchableOpacity>
                </View>
                   
            </View>

        </View>
    )
}