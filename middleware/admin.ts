import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async () => {
    const auth = useAuthStore();

    // Если пользователь не авторизован — пробуем токен
    if (!auth.isAuth) {
        if (!auth.tokens.access_token) {
            return navigateTo('/signin');
        }

        try {
            await auth.fetchUser();
        } catch (err) {
            await auth.logout();
            return navigateTo('/signin');
        }
    }

    // Если пользователь не админ — запрещаем доступ
    if (!auth.user?.isAdmin) {
        return showError({
            statusCode: 403,
            statusMessage: 'Доступ запрещён: только для администраторов'
        });
    }
});
