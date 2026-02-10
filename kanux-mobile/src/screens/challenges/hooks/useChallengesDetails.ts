import { challengesService } from "@/services/challenges.service";
import { useState, useEffect } from "react";

export function useChallengesDetails({ id }: { id: string }) {
    const [challengeType, setChallengeType] = useState<"technical" | "soft" | null>(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function loadChallengeData() {
            setLoading(true);
            setError(false);
            try {
                const techRes = await challengesService.getPublicTechnicalChallengeDetail(id);
                setData(techRes.data || techRes); 
                setChallengeType("technical");
            } catch (err) {
                try {
                    const softRes = await challengesService.getSoftChallenge(id);
                    setData(softRes);
                    setChallengeType("soft");
                } catch (softErr) {
                    console.error("Error detectando el reto:", softErr);
                    setError(true);
                    setChallengeType(null);
                }
            } finally {
                setLoading(false);
            }
        }

        if (id) loadChallengeData();
    }, [id]);

    return {
        challengeType,
        loading,
        data,
        error
    };
}