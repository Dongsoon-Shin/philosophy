import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    // Animation values
    const logoOpacity = useSharedValue(0);
    const logoScale = useSharedValue(0.9);
    const titleOpacity = useSharedValue(0);
    const subtitleOpacity = useSharedValue(0);
    const buttonOpacity = useSharedValue(0);
    const bgNode1Alpha = useSharedValue(0.1);

    useEffect(() => {
        // Sequence of animations for a premium feel
        logoOpacity.value = withTiming(1, { duration: 1500 });
        logoScale.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.back(1)) });

        titleOpacity.value = withDelay(800, withTiming(1, { duration: 1000 }));
        subtitleOpacity.value = withDelay(1200, withTiming(1, { duration: 1000 }));
        buttonOpacity.value = withDelay(2000, withTiming(1, { duration: 800 }));

        // Subtle background pulse
        bgNode1Alpha.value = withRepeat(
            withSequence(
                withTiming(0.2, { duration: 3000 }),
                withTiming(0.1, { duration: 3000 })
            ),
            -1,
            true
        );
    }, []);

    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const titleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: withTiming(titleOpacity.value ? 0 : 20) }],
    }));

    const subtitleStyle = useAnimatedStyle(() => ({
        opacity: subtitleOpacity.value,
    }));

    const buttonStyle = useAnimatedStyle(() => ({
        opacity: buttonOpacity.value,
        transform: [{ translateY: withTiming(buttonOpacity.value ? 0 : 10) }],
    }));

    const bgNodeStyle = useAnimatedStyle(() => ({
        opacity: bgNode1Alpha.value,
    }));

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Premium Background Blobs */}
            <Animated.View style={[styles.blob, styles.blob1, bgNodeStyle]} />
            <View style={[styles.blob, styles.blob2]} />

            <View style={styles.content}>
                {/* Minimalist Logo Symbol */}
                <Animated.View style={[styles.logoContainer, logoStyle]}>
                    <View style={styles.logoPillar} />
                    <View style={styles.logoBase} />
                    <View style={styles.logoTop} />
                </Animated.View>

                {/* Typography */}
                <Animated.View style={titleStyle}>
                    <Text style={styles.title}>PHILOSOPHY</Text>
                </Animated.View>

                <Animated.View style={subtitleStyle}>
                    <Text style={styles.subtitle}>사유의 깊이가 당신의 삶을 바꿉니다</Text>
                </Animated.View>
            </View>

            {/* Primary Action */}
            <Animated.View style={[styles.footer, buttonStyle]}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={styles.buttonText}>시작하기</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>기존 계정이 있으신가요? 로그인</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0B', // Deep obsidian
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    logoContainer: {
        width: 60,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    logoPillar: {
        width: 4,
        height: 40,
        backgroundColor: '#E2B170', // Muted Gold
        borderRadius: 2,
    },
    logoBase: {
        width: 30,
        height: 3,
        backgroundColor: '#E2B170',
        marginTop: 4,
        borderRadius: 1,
    },
    logoTop: {
        width: 20,
        height: 3,
        backgroundColor: '#E2B170',
        marginBottom: 4,
        borderRadius: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '300',
        color: '#F8FAFC',
        letterSpacing: 8,
        fontFamily: 'System', // Will look premium on iOS
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#94A3B8',
        letterSpacing: 1.5,
        fontWeight: '400',
    },
    footer: {
        width: '100%',
        paddingHorizontal: 40,
        paddingBottom: 60,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 56,
        backgroundColor: '#F8FAFC',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A0A0B',
        letterSpacing: 1,
    },
    footerText: {
        marginTop: 20,
        fontSize: 13,
        color: '#64748B',
        letterSpacing: 0.5,
    },
    blob: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        filter: 'blur(80px)', // Note: standard RN doesn't support 'filter', we'd use blur on iOS/Web or separate png
        opacity: 0.15,
    },
    blob1: {
        backgroundColor: '#E2B170',
        top: -width * 0.2,
        right: -width * 0.2,
    },
    blob2: {
        backgroundColor: '#334155',
        bottom: -width * 0.1,
        left: -width * 0.3,
        opacity: 0.1,
    },
});
