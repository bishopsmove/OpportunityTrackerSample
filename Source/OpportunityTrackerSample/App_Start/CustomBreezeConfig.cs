using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Breeze;
using Breeze.WebApi;
using Newtonsoft.Json;

namespace OpportunityTrackerSample.App_Start
{
    public class CustomBreezeConfig : Breeze.WebApi.BreezeConfig
    {
        protected override JsonSerializerSettings CreateJsonSerializerSettings()
        {
            var baseSettings = base.CreateJsonSerializerSettings();
            baseSettings.NullValueHandling = NullValueHandling.Include;
            baseSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
            return baseSettings;
        }
    }
}