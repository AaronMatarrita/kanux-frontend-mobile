import Header from "@/components/ui/Header";
import { colors, commonStyles, spacing, typography } from "@/theme";
import { ChallengesStackParamList } from "@/types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import { ActivityIndicator, Text, View } from "react-native";
import { useChallengesDetails } from "../hooks/useChallengesDetails";
import { TechnicalChallengeDetails } from "../components/TechnicalChallengeDetails";
import { SoftChallengeDetails } from "../components/SoftChallengeDetails";
import { ChallengeDetailSkeleton } from "../components/ChallengeDetailsSkeleton";


const ChallengesDetailsScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ChallengesStackParamList, "ChallengeDetail">>();
    const { challengeId } = route.params;

    const { challengeType, loading, data, error } = useChallengesDetails({ id: challengeId });

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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text style={{ textAlign: 'center', color: colors.gray600 }}>
                        No pudimos encontrar la información de este desafío.
                    </Text>
                </View>
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