# TRMNL Calendar Dashboard
A custom calendar + weather plugin for TRMNL by Zoltán Hosszú. Rewritten for use with [Larapaper](https://github.com/usetrmnl/larapaper) by ymstnt.

This plugin loads data from a remote iCal calendars and Open Meteo's data for a given location, and displays a nice personal dashboard.

![TRMNL Calendar Dashboard](preview.png)

## Usage with Larapaper
1. Create a new Recipe.
  - Click **Add Recipe** on the **Recipes & Plugins** page.
  - Select **Polling** and paste the URL found under `polling_url` in `settings.yml`.
  - Leave the rest on default. 
2. Paste in the markup: `full.liquid` goes under `Full` or `Responsive` and `shared.liquid` goes under `Shared`.
  - Make sure to also click **Save** on the bottom.
3. Paste in the configuration template.
  - Next to **Add to Playlist**, there is a **down arrow**, click that and select **Recipe Settings**.
  - Under **Configuration Template**, paste in everything found after `custom_fields` in `settings.yml`.
  - Click **Save**.
4. Configure the plugin using **Configuration Fields**.
  - Set latitude and longitude using [Lantlong](https://www.latlong.net/) for the weather
  - Set your timezone.
  - Set the name of the days (make sure to name all 7).
  - Set the name of the months (make sure to name all 12).
  - Set the word for today.
  - Set the word for tomorrow.
  - Set your important events, which should appear as countdown on the bottom.
5. Paste your .ics links as **Polling URL**s under the weather URL.
  - It is very important that the first URL is the OpenMeteo weather URL and the calendars come after it.
  - Separate each .ics URLs with a newline.
  - Only include 5 .ics URLs maximum. You can include more, but you will need to extend the calendar logic in `shared.liquid`