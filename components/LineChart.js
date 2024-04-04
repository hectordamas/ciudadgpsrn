import React, {useState} from "react";
import {View, Text, Dimensions} from 'react-native'
import {LineChart as Chart} from "react-native-chart-kit";
import Svg, {Text as TextSVG, Rect } from "react-native-svg";
import { Card } from "react-native-paper";

const LineChart = ({data, labels, title, backgroundGradientFrom, backgroundGradientTo}) => {
    let [tooltipPos, setTooltipPos] = useState({ x:0, y:0, visible:false, value:0 })
    const { width } = Dimensions.get('window');
    const cardChartWidth = width - 20;
    return (
      <Card style={{marginBottom: 20, borderRadius: 5}}>
        <Card.Content>
          <Chart data={{
                labels,
                datasets: [{ data }]
              }}
              withVerticalLines={false}
              width={cardChartWidth - 50} // Ajusta el ancho del gráfico aquí
              height={200}
              style={{ paddingRight: 27}}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#f7f3f9",
                backgroundGradientFrom,
                backgroundGradientTo,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 173, 232, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 5
                },
                style: {
                  borderRadius: 5,
                },
                propsForLabels: {
                  fontSize: 9.5,
                },
                propsForBackgroundLines: {
                  strokeDasharray: "",
                  stroke: "#e9e9e9" 
                }
              }}
              bezier
              decorator={() => {
                  return tooltipPos.visible ? 
                <View>
                   <Svg>
                      <Rect x={tooltipPos.x - 15} y={tooltipPos.y + 10} width="30" height="30" fill="black" />
                      <TextSVG
                         x={tooltipPos.x}
                         y={tooltipPos.y + 30}
                         fill="white"
                         fontSize="12"
                         fontWeight="bold"
                         textAnchor="middle">
                         {tooltipPos.value.toFixed(0)}
                      </TextSVG>
                   </Svg>
               </View> : null
              }}
             onDataPointClick={
              (data) => {
                 let isSamePoint = (tooltipPos.x === data.x && tooltipPos.y ===  data.y)
                 isSamePoint ? setTooltipPos((previousState) => {
                                    return {
                                         ...previousState, 
                                         value: data.value,
                                         visible: !previousState.visible}
                                    })
                              : 
                            setTooltipPos({x: data.x, 
                               value: data.value, y: data.y,
                               visible: true
                            });
               }
            }
          />
        </Card.Content>
      </Card>
    )

    return (
        <View style={{marginVertical: 10, borderWidth: .2, borderColor: '#bdbdbd', borderRadius: 3}}>
            <Text style={{fontSize: 15, fontFamily: 'roboto-medium', marginLeft: 10, marginVertical: 10}}>{title}</Text>
            <Chart
              data={{
                labels,
                datasets: [{ data }]
              }}
              width={Dimensions.get("window").width - 40}
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#6610f2",
                backgroundGradientFrom,
                backgroundGradientTo,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 5
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{ marginTop: 5, paddingRight: 40}}
              decorator={() => {
                  return tooltipPos.visible ? <View>
                   <Svg>
                      <Rect x={tooltipPos.x -15} y={tooltipPos.y + 10} width="40"  
                       height="30" fill="black" />
                      <TextSVG
                         x={tooltipPos.x + 5}
                         y={tooltipPos.y + 30}
                         fill="white"
                         fontSize="16"
                         fontWeight="bold"
                         textAnchor="middle">
                         {tooltipPos.value.toFixed(0)}
                      </TextSVG>
                   </Svg>
               </View> : null
              }}
             onDataPointClick={
              (data) => {
                 let isSamePoint = (tooltipPos.x === data.x && tooltipPos.y ===  data.y)
                 isSamePoint ? setTooltipPos((previousState) => {
                                    return {
                                         ...previousState, 
                                         value: data.value,
                                         visible: !previousState.visible}
                                    })
                              : 
                            setTooltipPos({x: data.x, 
                               value: data.value, y: data.y,
                               visible: true
                            });
               }
            }
            />
        </View>
    )

}

export default LineChart