﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Models
{
    public class Opportunity : EntityBase
    {

        

        public int RepID { get; set; }
        [ForeignKey("RepID")]
        public Representative AssociatedRep { get; set; }
    }
}
