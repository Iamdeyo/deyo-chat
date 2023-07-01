export function formatMessageTime(timestamp) {
  if (timestamp) {
    const datetime = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const messageDate = new Date(datetime);
    const currentDate = new Date();

    // Check if the message was sent today
    if (
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Check if the message was sent yesterday
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    if (
      messageDate.getDate() === yesterday.getDate() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    }

    // Check if the message was sent within the past week
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayOfWeekIndex = messageDate.getDay();
    if (currentDate - messageDate <= 7 * 24 * 60 * 60 * 1000) {
      return daysOfWeek[dayOfWeekIndex];
    }

    // Format the date as 'day/month/year' if not within the week
    const formattedDate = `${messageDate.getDate()}/${
      messageDate.getMonth() + 1
    }/${messageDate.getFullYear()}`;
    return formattedDate;
  }
}
