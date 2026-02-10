import Header from "@/components/ui/Header";
import { colors, commonStyles, spacing, typography } from "@/theme";
import { ChallengesStackParamList } from "@/types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { Text, View } from "react-native";
import { useChallengesDetails } from "../hooks/useChallengesDetails";
import { TechnicalChallengeDetails } from "../components/TechnicalChallengeDetails";
import { SoftChallengeDetails } from "../components/SoftChallengeDetails";
import { ChallengeDetailSkeleton } from "../components/ChallengeDetailsSkeleton";
import { RetryState } from "@/components/ui/RetryState";


const ChallengesDetailsScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ChallengesStackParamList, "ChallengeDetail">>();
    const { challengeId } = route.params;

    const { challengeType, loading, data, error, loadChallengeData } = useChallengesDetails({ id: challengeId });

    return (
        <View style={[commonStyles.container, { flex: 1 }]}>
            <Header
                title="Detalles"
                leftIcon={<ChevronLeft color={colors.textColors.inverted} size={24} />}
                onLeftPress={() => navigation.goBack()}
            />
            {loading ? (
                <ChallengeDetailSkeleton />
            ) : error || !challengeType ? (
                <RetryState
                    title="Error de conexión"
                    message="No logramos obtener la información del desafío seleccionado."
                    onRetry={() => loadChallengeData()}
                />
            ) : (
                <>
                    {challengeType === "technical" ? (
                        <TechnicalChallengeDetails data={data} />
                    ) : (
                        <SoftChallengeDetails data={data} />
                    )}
                </>
            )}
        </View>
    );
};
export default ChallengesDetailsScreen;