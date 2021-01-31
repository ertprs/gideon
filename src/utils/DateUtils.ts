class DateUtils {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  /**
   * getDayNumberInString
   * @param animeCase boolean
   */
  public getCurrentDay(animeCase?: boolean) {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    let day = this.date.getDay();

    if (animeCase) {
      day = day === 6 ? (day = 0) : (day += 1);
    }

    return days[day];
  }
}

export default DateUtils;
