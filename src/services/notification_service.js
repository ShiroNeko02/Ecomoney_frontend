   // services/notification.js
   import { useBudgetStore } from '@/stores/budgetStore';
   
   export const notificationService = {
     checkBudgetStatus() {
       const budgetStore = useBudgetStore();
       const { percentage } = budgetStore;
       
       if (percentage < 20) {
         this.showNotification(
           'Budget Alert',
           'You have less than 20% of your monthly budget remaining',
           'error'
         );
       } else if (percentage < 40 && percentage > 30) {
         this.showNotification(
           'Budget Warning',
           'You have less than 40% of your monthly budget remaining',
           'warning'
         );
       }
     },
     
     showNotification(title, message, type = 'info') {
       // Intégrer avec votre système de notification
       // Par exemple: Vuetify snackbar ou une bibliothèque comme vue-toastification
     }
   };