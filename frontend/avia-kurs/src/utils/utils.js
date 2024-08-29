export function formatTime (timestamp) {
   const date = new Date(timestamp);
   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


export function formatDate(input) {
   const months = [
     'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
     'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
   ];

   const date = new Date(input);
 
   const hours = date.getHours().toString().padStart(2, '0');
   const minutes = date.getMinutes().toString().padStart(2, '0');
   const day = date.getDate();
   const month = months[date.getMonth()];
 
   return `${hours}:${minutes}, ${day} ${month}`;
 }