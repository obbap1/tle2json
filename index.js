const axios = require('axios');
const fs = require('fs');
const { isValidLink } = require('./utils');

const T = {
  /**
   *
   * @param {string} url Either the URL link or path to the text file
   * @param {string} path The path to where the output should be written to.
   */
  async convert({ url, path = '' }) {
    if (!isValidLink(url)) throw new Error('Invalid Link');

    const final = [];

    const { data } = await axios.get(url).catch((error) => {
      throw new Error(error.message || 'An Error occured while fetching data');
    });

    const result = data.split('\r\n').filter((l) => !!l);

    // Use 3 because of the Two line element. Title, First Line, Second Line
    for (let i = 0; i < result.length; i += 3) {
      const arr = result.slice(i, i + 3);

      const convertedArray = this.convertTle2Json(arr);

      final.push(convertedArray);
    }

    if (path) fs.writeFileSync(path, JSON.stringify(final, null, 2));

    return final;
  },
  /**
   *
   * @param {array} a An array of individual satellites and their TLE's
   */
  convertTle2Json(a) {
    const arr = [...a];

    return arr.reduce(
      (acc, line) => {
        if (line.startsWith('1')) {
          //use format
          acc.data.satellite_catalog_number = line.slice(2, 7).trim();
          acc.data.classification = line[7].trim();
          acc.data.international_designator_last_two_digits_of_launch_year = line
            .slice(9, 11)
            .trim();
          acc.data.international_designator_launch_number_of_the_year = line
            .slice(11, 14)
            .trim();
          acc.data.international_designator_piece_of_the_launch = line
            .slice(14, 17)
            .trim();
          acc.data.epoch_year_last_two_digits_of_the_year = line.slice(18, 20);
          acc.data.epoch_day_of_the_year_and_fractional_portion_of_the_day = line
            .slice(20, 32)
            .trim();
          acc.data.first_derivative_of_mean_motion_aka_the_ballistic_coefficient = line
            .slice(33, 43)
            .trim();
          acc.data.second_derivative_of_mean_motion_decimal_point_assumed = line
            .slice(44, 52)
            .trim();
          acc.data.drag_term_aka_radiation_pressure_coefficient = line
            .slice(53, 61)
            .trim();
          acc.data.ephemeris_type = line[62].trim();
          acc.data.element_set_number = line.slice(64, 68).trim();
          acc.data.check_sum = line[68].trim();
        } else if (line.startsWith('2')) {
          acc.data.inclination = line.slice(8, 16).trim();
          acc.data.right_ascension_of_the_ascending_node = line
            .slice(17, 25)
            .trim();
          acc.data.eccentricity = line.slice(26, 33).trim();
          acc.data.argument_of_perigee = line.slice(34, 42).trim();
          acc.data.mean_anomaly = line.slice(43, 51).trim();
          acc.data.mean_motion = line.slice(52, 63).trim();
          acc.data.revolution_number_at_epoch = line.slice(63, 68).trim();
          acc.data.check_sum = line[68].trim();
        } else {
          // its the title
          acc.title = line.trim();
        }

        return acc;
      },
      { title: '', data: {} }
    );
  }
};

module.exports = T;
