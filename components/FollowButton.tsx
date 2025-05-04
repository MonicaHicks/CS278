import { Button, View } from 'react-native';
import theme from '../assets/theme';


type FollowButtonProps = { isFollowing: boolean };

export default function FollowButton({isFollowing}: FollowButtonProps) {
    let buttonText = isFollowing ? 'Unfollow' : 'Follow';
    return (
        <View>
            <Button
                title={buttonText}
                onPress={() => {
                    // Handle follow action
                    console.log('Follow button pressed');
                }
                }
                color={theme.colors.primary}
                accessibilityLabel="Follow this user"
            >
            </Button>
        </View>
    );
}