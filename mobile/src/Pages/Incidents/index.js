import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import{View, FlatList, Image, Text, TouchableOpacity} from 'react-native'

import api from '../../services/api'

import logImg from '../../assests/logo.png'

import styles from './styles'

export default function Incidents(){
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()
    const [page, setPge] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigationToDetail(Incident) {
        navigation.navigate('Detail',{Incident})
    }

    async function loadIncidents(){
        if(loading){
            return
        }

        if(total > 0 && incidents.length === total){
            return
        }

        setLoading(true)
        const response = await api.get('incidents', {params : {page}})
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-cout'])
        setPge(page + 1)
        setLoading(false)
    }

    useEffect(()=> {
        loadIncidents()
    }, [])

    return(
        <View style={styles.container}> 
            <View style={styles.header}>
                <Image source={logImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>
                        {total} casos
                    </Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
       
            <FlatList
                data={incidents}
                keyExtractor={Incident => String(incidents.id)}
                showsVerticalScrollIndicator={false}
                style={styles.IncidentList}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0,2}
                renderItem={({item : Incident })=>(
                    <View style={styles.Incident}>
                        <Text style={styles.IncidentPropetry}> ONG:</Text>
                        <Text style={styles.IncidentValue}> {Incident.name} </Text>

                        <Text style={styles.IncidentPropetry}> Caso:</Text>
                        <Text style={styles.IncidentValue}> {Incident.title} </Text>

                        <Text style={styles.IncidentPropetry}> VALOR:</Text>
                        <Text style={styles.IncidentValue}> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Incident.value)} </Text>

                        <TouchableOpacity  
                        style={styles.detailsButton} 
                        onPress={()=>navigationToDetail(Incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#E02041'/>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}