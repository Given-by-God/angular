import { Injectable } from '@angular/core';
import {HttpClient}    from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

 url = "https://graph.facebook.com/v4.0/me/adaccounts?fields=insights.date_preset(yesterday),campaigns{name},ads.date_preset(yesterday).time_increment(yesterday).limit(500){insights.limit(500).date_preset(yesterday){results,relevance_score,cpm,inline_link_click_ctr},adlabels,created_time,recommendations,updated_time,ad_review_feedback,bid_info,configured_status,delivery_info,status,effective_status,adcreatives.limit(500){place_page_set_id,object_story_spec{instagram_actor_id,link_data{link},page_id},image_crops,image_url,status,thumbnail_url},result,cost_per_lead_fb,name,clicks,spent,cost_per,reach,link_ctr,impressions},date{yesterday},funding_source_details,business{name},adrules_library{name},transactions,current_unbilled_spend,adspaymentcycle,spend_cap,amount_spent,age,disable_reason,account_status,balance,all_payment_methods{pm_credit_card{account_id,credential_id,display_string,exp_month,exp_year}},currency,timezone_name,created_time,name,adtrust_dsl,business_country_code&limit=25&locale=ru_RU&access_token=EAABsbCS1iHgBADskDIAk2BZBgTbQIbeyOUdoUcAa71JQkGwlYmOo3Ff5QmwYOkSpIiHz2XG406I6iIzN3ozZBd9fX4EEWlEEvtdgV8WWTNHGi1InFAwv0Ln9jswjn9I4YBYdCfcL8deZA3l2Y8IK6A5qzp4v7Sf89nKjX5SmAZDZD";
  constructor(private _http:HttpClient) { }

// url = "testr";

response:any; 


// getDataOfAds(token){
// // return this._http.get("https://graph.facebook.com/v4.0/me/adaccounts?fields=insights.date_preset(yesterday),campaigns{name},ads.date_preset(yesterday).time_increment(yesterday).limit(500){insights.limit(500).date_preset(yesterday){results,relevance_score,cpm,inline_link_click_ctr},adlabels,created_time,recommendations,updated_time,ad_review_feedback,bid_info,configured_status,delivery_info,status,effective_status,adcreatives.limit(500){place_page_set_id,object_story_spec{instagram_actor_id,link_data{link},page_id},image_crops,image_url,status,thumbnail_url},result,cost_per_lead_fb,name,clicks,spent,cost_per,reach,link_ctr,impressions},date{yesterday},funding_source_details,business{name},adrules_library{name},transactions,current_unbilled_spend,adspaymentcycle,spend_cap,amount_spent,age,disable_reason,account_status,balance,all_payment_methods{pm_credit_card{account_id,credential_id,display_string,exp_month,exp_year}},currency,timezone_name,created_time,name,adtrust_dsl,business_country_code&limit=25&locale=ru_RU&access_token="+ token);  

// // c токеном хардкод
// return this._http.get("https://graph.facebook.com/v4.0/me/adaccounts?fields=insights.date_preset(yesterday),campaigns{name},ads.date_preset(yesterday).time_increment(yesterday).limit(500){insights.limit(500).date_preset(yesterday){results,relevance_score,cpm,inline_link_click_ctr},adlabels,created_time,recommendations,updated_time,ad_review_feedback,bid_info,configured_status,delivery_info,status,effective_status,adcreatives.limit(500){place_page_set_id,object_story_spec{instagram_actor_id,link_data{link},page_id},image_crops,image_url,status,thumbnail_url},result,cost_per_lead_fb,name,clicks,spent,cost_per,reach,link_ctr,impressions},date{yesterday},funding_source_details,business{name},adrules_library{name},transactions,current_unbilled_spend,adspaymentcycle,spend_cap,amount_spent,age,disable_reason,account_status,balance,all_payment_methods{pm_credit_card{account_id,credential_id,display_string,exp_month,exp_year}},currency,timezone_name,created_time,name,adtrust_dsl,business_country_code&limit=25&locale=ru_RU&access_token=EAABsbCS1iHgBADskDIAk2BZBgTbQIbeyOUdoUcAa71JQkGwlYmOo3Ff5QmwYOkSpIiHz2XG406I6iIzN3ozZBd9fX4EEWlEEvtdgV8WWTNHGi1InFAwv0Ln9jswjn9I4YBYdCfcL8deZA3l2Y8IK6A5qzp4v7Sf89nKjX5SmAZDZD");  
// }


// getDataOfAds(token){
// return new Promise((resolve, reject) => {
//     this._http.get(this.url).subscribe((data) => {
//       resolve(data);
//       console.log("POST Request is successful ", data);
//     }, (error) => {
//       reject(error);
//       console.log("Error", error);
//     });
//   });
// }

getDataOfAds(token) {
    return this._http.get(this.url)
  }

}