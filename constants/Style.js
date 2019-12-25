import Colors from "./Colors";
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width

export const i = {
    container: {
        flex: 1,
        paddingTop: 24,
        backgroundColor: '#eee',
    },
    modal: {
        width: width - 40,
        height: width / 2.2,
        borderRadius: 5,
        shadowColor: "black",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        backgroundColor: "white"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0,0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalBtn: {
        padding: 5,
        marginHorizontal: 6,
        backgroundColor: Colors.BLUE,
        width: 70,
        borderRadius: 5,
        alignItems: 'center',
    }
}