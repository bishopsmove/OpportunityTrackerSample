using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;


namespace OpportunityTrackerSample.Entities.Models
{
    public class ContactCategory : EntityBase
    {
        public ContactCategory()
        {
            TypeNameValue = TypeNameValue == 0 ? 1 : TypeNameValue;
        }

        public int TypeNameValue { get; set; }
        public ContactType TypeName {
            get { return (ContactType)TypeNameValue; }
            set { TypeNameValue = (int)value; }
        }
    }
}
