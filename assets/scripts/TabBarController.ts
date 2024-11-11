// TabBarController.ts

import { _decorator, Component, Node, Label, Color, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TabBarController')
export class TabBarController extends Component {
    // Ссылки на страницы
    @property(Node)
    mainPage: Node = null;

    @property(Node)
    friendsPage: Node = null;

    @property(Node)
    storePage: Node = null;

    @property(Node)
    leadersPage: Node = null;

    @property(Node)
    tasksPage: Node = null;

    // Ссылки на иконки вкладок
    @property(Node)
    iconHome: Node = null;

    @property(Node)
    iconFriends: Node = null;

    @property(Node)
    iconStore: Node = null;

    @property(Node)
    iconLeaders: Node = null;

    @property(Node)
    iconTasks: Node = null;

    // Ссылки на текстовые метки вкладок
    @property(Label)
    textHome: Label = null;

    @property(Label)
    textFriends: Label = null;

    @property(Label)
    textStore: Label = null;

    @property(Label)
    textLeaders: Label = null;

    @property(Label)
    textTasks: Label = null;

    // Ссылки на индикаторы вкладок
    @property(Node)
    buttonHome: Node = null;

    @property(Node)
    buttonFriends: Node = null;

    @property(Node)
    buttonLeaders: Node = null;

    @property(Node)
    buttonTasks: Node = null;

    // Визуальный индикатор активной вкладки "Магазин"
    @property(Node)
    activeButton: Node = null;

    // Текущая активная вкладка
    private currentTab: string = 'home';

    onLoad() {
        // Проверка всех свойств на null и логирование
        this.checkProperties();

        // Инициализация: показать главную страницу без анимации
        this.showPage(this.currentTab, false);

        // Присоединение обработчиков событий к иконкам вкладок
        this.iconHome.on(Node.EventType.TOUCH_END, () => {
            this.showPage('home', true);
        });

        this.iconFriends.on(Node.EventType.TOUCH_END, () => {
            this.showPage('friends', true);
        });

        this.iconStore.on(Node.EventType.TOUCH_END, () => {
            this.showPage('store', true);
        });

        this.iconLeaders.on(Node.EventType.TOUCH_END, () => {
            this.showPage('leaders', true);
        });

        this.iconTasks.on(Node.EventType.TOUCH_END, () => {
            this.showPage('tasks', true);
        });
    }

    /**
     * Проверяет все свойства на null и выводит предупреждения в консоль
     */
    private checkProperties() {
        const properties = [
            { name: 'mainPage', value: this.mainPage },
            { name: 'friendsPage', value: this.friendsPage },
            { name: 'storePage', value: this.storePage },
            { name: 'leadersPage', value: this.leadersPage },
            { name: 'tasksPage', value: this.tasksPage },
            { name: 'iconHome', value: this.iconHome },
            { name: 'iconFriends', value: this.iconFriends },
            { name: 'iconStore', value: this.iconStore },
            { name: 'iconLeaders', value: this.iconLeaders },
            { name: 'iconTasks', value: this.iconTasks },
            { name: 'textHome', value: this.textHome },
            { name: 'textFriends', value: this.textFriends },
            { name: 'textStore', value: this.textStore },
            { name: 'textLeaders', value: this.textLeaders },
            { name: 'textTasks', value: this.textTasks },
            { name: 'buttonHome', value: this.buttonHome },
            { name: 'buttonFriends', value: this.buttonFriends },
            { name: 'buttonLeaders', value: this.buttonLeaders },
            { name: 'buttonTasks', value: this.buttonTasks },
            { name: 'activeButton', value: this.activeButton },
        ];

        properties.forEach(prop => {
            if (!prop.value) {
                console.warn(`Property "${prop.name}" is not assigned in the inspector.`);
            }
        });
    }

    /**
     * Переключает видимую страницу и обновляет состояние вкладок
     * @param pageName - имя страницы ('home', 'friends', 'store', 'leaders', 'tasks')
     * @param animate - показывать ли анимацию при переключении
     */
    showPage(pageName: string, animate: boolean = true) {
        if (pageName === this.currentTab) return;

        // Скрыть текущую страницу с анимацией
        this.hidePage(this.currentTab, animate);

        // Показать новую страницу с анимацией
        this.showNewPage(pageName, animate);

        // Обновить состояние вкладок
        this.updateTabUI(pageName);

        // Обновить текущую вкладку
        this.currentTab = pageName;
    }

    /**
     * Скрывает указанную страницу
     * @param pageName - имя страницы для скрытия
     * @param animate - использовать ли анимацию
     */
    hidePage(pageName: string, animate: boolean) {
        const pageNode = this.getPageNode(pageName);
        if (pageNode) {
            let uiOpacity = pageNode.getComponent(UIOpacity);
            if (!uiOpacity) {
                console.warn(`UIOpacity component not found on "${pageName}" page. Adding one.`);
                uiOpacity = pageNode.addComponent(UIOpacity);
            }

            if (animate) {
                // Анимация уменьшения масштаба
                tween(pageNode)
                    .to(0.3, { scale: new Vec3(0.95, 0.95, 1) })
                    .start();

                // Анимация уменьшения прозрачности
                tween(uiOpacity)
                    .to(0.3, { opacity: 0 })
                    .call(() => {
                        pageNode.active = false;
                        // Возвращаем исходный масштаб и прозрачность для будущих показов
                        pageNode.setScale(1, 1, 1);
                        uiOpacity.opacity = 255;
                        console.log(`Page "${pageName}" скрыта.`);
                    })
                    .start();
            } else {
                pageNode.active = false;
                uiOpacity.opacity = 255;
                console.log(`Page "${pageName}" скрыта без анимации.`);
            }
        } else {
            console.error(`Page node for "${pageName}" not found.`);
        }
    }

    /**
     * Показывает указанную страницу
     * @param pageName - имя страницы для показа
     * @param animate - использовать ли анимацию
     */
    showNewPage(pageName: string, animate: boolean) {
        const pageNode = this.getPageNode(pageName);
        if (pageNode) {
            pageNode.active = true;
            let uiOpacity = pageNode.getComponent(UIOpacity);
            if (!uiOpacity) {
                console.warn(`UIOpacity component not found on "${pageName}" page. Adding one.`);
                uiOpacity = pageNode.addComponent(UIOpacity);
            }

            if (animate) {
                // Устанавливаем начальные параметры для анимации
                uiOpacity.opacity = 0;
                pageNode.setScale(0.95, 0.95, 1);

                // Анимация увеличения прозрачности
                tween(uiOpacity)
                    .to(0.3, { opacity: 255 })
                    .start();

                // Анимация увеличения масштаба
                tween(pageNode)
                    .to(0.3, { scale: new Vec3(1.05, 1.05, 1) })
                    .to(0.3, { scale: new Vec3(1, 1, 1) })
                    .call(() => {
                        console.log(`Page "${pageName}" показана.`);
                    })
                    .start();
            } else {
                uiOpacity.opacity = 255;
                pageNode.setScale(1, 1, 1);
                console.log(`Page "${pageName}" показана без анимации.`);
            }
        } else {
            console.error(`Page node for "${pageName}" not found.`);
        }
    }

    /**
     * Возвращает ноду страницы по имени
     * @param pageName - имя страницы
     */
    getPageNode(pageName: string): Node | null {
        switch (pageName) {
            case 'home':
                return this.mainPage;
            case 'friends':
                return this.friendsPage;
            case 'store':
                return this.storePage;
            case 'leaders':
                return this.leadersPage;
            case 'tasks':
                return this.tasksPage;
            default:
                console.warn(`Unknown page: ${pageName}`);
                return null;
        }
    }

    /**
     * Обновляет UI вкладок (цвет текста и индикаторы)
     * @param activePage - имя активной страницы
     */
    updateTabUI(activePage: string) {
        // Сбросить все цвета текстов на серый
        this.textHome.color = Color.GRAY;
        this.textFriends.color = Color.GRAY;
        this.textStore.color = Color.GRAY;
        this.textLeaders.color = Color.GRAY;
        this.textTasks.color = Color.GRAY;

        // Скрыть все индикаторы
        this.activeButton.active = false;
        this.buttonHome.active = false;
        this.buttonFriends.active = false;
        this.buttonLeaders.active = false;
        this.buttonTasks.active = false;

        switch (activePage) {
            case 'home':
                this.textHome.color = Color.WHITE;
                this.buttonHome.active = true;
                break;
            case 'friends':
                this.textFriends.color = Color.WHITE;
                this.buttonFriends.active = true;
                break;
            case 'store':
                this.textStore.color = Color.WHITE;
                this.activeButton.active = true;
                break;
            case 'leaders':
                this.textLeaders.color = Color.WHITE;
                this.buttonLeaders.active = true;
                break;
            case 'tasks':
                this.textTasks.color = Color.WHITE;
                this.buttonTasks.active = true;
                break;
        }
    }
}
