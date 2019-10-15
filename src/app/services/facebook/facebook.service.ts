import { Injectable } from '@angular/core';
import {HttpClient}    from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

constructor(private _http:HttpClient) { }

response:any; 
// getDataOfAds(token){
// // return this._http.get("https://graph.facebook.com/v4.0/me/adaccounts?fields=insights.date_preset(today),campaigns{name},ads.date_preset(today).time_increment(today).limit(500){insights.limit(500).date_preset(today){results,relevance_score,cpm,inline_link_click_ctr},adlabels,created_time,recommendations,updated_time,ad_review_feedback,bid_info,configured_status,delivery_info,status,effective_status,adcreatives.limit(500){place_page_set_id,object_story_spec{instagram_actor_id,link_data{link},page_id},image_crops,image_url,status,thumbnail_url},result,cost_per_lead_fb,name,clicks,spent,cost_per,reach,link_ctr,impressions},date{today},funding_source_details,business{name},adrules_library{name},transactions,current_unbilled_spend,adspaymentcycle,spend_cap,amount_spent,age,disable_reason,account_status,balance,all_payment_methods{pm_credit_card{account_id,credential_id,display_string,exp_month,exp_year}},currency,timezone_name,created_time,name,adtrust_dsl,business_country_code&limit=25&locale=ru_RU&access_token="+ token);  

// // c токеном хардкод
// return this._http.get("https://graph.facebook.com/v4.0/me/adaccounts?fields=insights.date_preset(today),campaigns{name},ads.date_preset(today).time_increment(today).limit(500){insights.limit(500).date_preset(today){results,relevance_score,cpm,inline_link_click_ctr},adlabels,created_time,recommendations,updated_time,ad_review_feedback,bid_info,configured_status,delivery_info,status,effective_status,adcreatives.limit(500){place_page_set_id,object_story_spec{instagram_actor_id,link_data{link},page_id},image_crops,image_url,status,thumbnail_url},result,cost_per_lead_fb,name,clicks,spent,cost_per,reach,link_ctr,impressions},date{today},funding_source_details,business{name},adrules_library{name},transactions,current_unbilled_spend,adspaymentcycle,spend_cap,amount_spent,age,disable_reason,account_status,balance,all_payment_methods{pm_credit_card{account_id,credential_id,display_string,exp_month,exp_year}},currency,timezone_name,created_time,name,adtrust_dsl,business_country_code&limit=25&locale=ru_RU&access_token=EAABsbCS1iHgBADskDIAk2BZBgTbQIbeyOUdoUcAa71JQkGwlYmOo3Ff5QmwYOkSpIiHz2XG406I6iIzN3ozZBd9fX4EEWlEEvtdgV8WWTNHGi1InFAwv0Ln9jswjn9I4YBYdCfcL8deZA3l2Y8IK6A5qzp4v7Sf89nKjX5SmAZDZD");  
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


pauseAdset(adset_id,token){
  let url = "https://graph.facebook.com/v4.0/" + adset_id + "fields=campaign_status=PAUSED&access_token=" + token;
  console.log(url);
  // return this._http.get(url);
}

hideComments(comment_id,token){   
 return  this._http.post("https://graph.facebook.com/v4.0/" + comment_id + "?is_hidden=true&access_token=" + token,"")
}

getAdsPostsAndPagesTokens(token){
  return this._http.get("https://graph.facebook.com/v4.0/me/adaccounts?fields=ads{id,name,creative{id,effective_instagram_story_id,effective_object_story_id}},promote_pages{access_token}&access_token="+token);
}                                                                        

getComments(adsPost,token){
  return this._http.get("https://graph.facebook.com/v4.0/" + adsPost + "?fields=comments{is_hidden,object}&access_token=" + token);
}


getDataOfAds(token,dateOne?,dateTwo?,data?) {
  console.log(dateOne)
  console.log(dateTwo)
  
  let choosData = "" ;
  if(data){
    choosData = "date_preset("+ data +")";
    console.log("дата есть data_preset");
    
  }  
  else if(dateOne && dateTwo){
    choosData = "time_range({'since':'"+ dateOne +"', 'until':'"+ dateTwo +"'})"
    console.log("есть  time_range");
  }
  else{
    choosData = "date_preset(lifetime)"; 
  }

  console.log(choosData);


//https://graph.facebook.com/v4.0/me/adaccounts?fields=campaigns{name},ads.date_preset(lifetime){insights.limit(500){results,relevance_score,cpm,inline_link_click_ctr},adlabels,created_time,recommendations,updated_time,ad_review_feedback,bid_info,configured_status,delivery_info,status,effective_status,adcreatives.limit(500){place_page_set_id,object_story_spec{instagram_actor_id,link_data{link},page_id},image_crops,image_url,status,thumbnail_url},result,cost_per_lead_fb,name,clicks,spent,cost_per,reach,link_ctr,impressions},funding_source_details,business{name},adrules_library{name},transactions,current_unbilled_spend,adspaymentcycle,spend_cap,amount_spent,age,disable_reason,account_status,balance,all_payment_methods{pm_credit_card{account_id,credential_id,display_string,exp_month,exp_year}},currency,timezone_name,created_time,name,adtrust_dsl,business_country_code&limit=25&locale=ru_RU&access_token=


  let url = "https://graph.facebook.com/v4.0/me/adaccounts?fields=adspixels{id,name},campaigns{name},ads."+ choosData +"{insights.limit(500){results,relevance_score,cpm,inline_link_click_ctr},adlabels,created_time,recommendations,updated_time,ad_review_feedback,bid_info,configured_status,delivery_info,status,effective_status,adcreatives.limit(500){place_page_set_id,object_story_spec{instagram_actor_id,link_data{link},page_id},image_crops,image_url,status,thumbnail_url},adset_id,result,cost_per_lead_fb,name,clicks,spent,cost_per,reach,link_ctr,impressions},funding_source_details,business{name},adrules_library{name},transactions,current_unbilled_spend,adspaymentcycle,spend_cap,amount_spent,age,disable_reason,account_status,balance,all_payment_methods{pm_credit_card{account_id,credential_id,display_string,exp_month,exp_year}},currency,timezone_name,created_time,name,adtrust_dsl,business_country_code&limit=25&locale=ru_RU&access_token=";
  
    console.log(url);
    return this._http.get(url+token)
  }

}