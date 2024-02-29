import { View, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

var { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={{width , height}} className="absolute flex-row justify-center items-center">
        <Progress.Circle thickness={12} size={160} indeterminate={true} color={theme.background} />
    </View>
  )
}